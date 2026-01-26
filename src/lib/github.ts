import { Octokit } from '@octokit/rest';
import type { GitHubFile } from '../types/chat';

const OWNER = 'Aventerica89';
const REPO = 'jb-cloud-docs';
const BRANCH = 'main';

// Allowed paths for security
const ALLOWED_PREFIXES = ['src/content/docs/'];

function validatePath(path: string): boolean {
  const normalizedPath = path.replace(/\\/g, '/');

  // Prevent directory traversal
  if (normalizedPath.includes('..')) {
    return false;
  }

  // Must be in allowed directories
  return ALLOWED_PREFIXES.some(prefix => normalizedPath.startsWith(prefix));
}

function getOctokit(token: string): Octokit {
  return new Octokit({ auth: token });
}

export async function listFiles(token: string, path: string): Promise<string[]> {
  if (!validatePath(path) && path !== 'src/content/docs') {
    throw new Error(`Access denied: ${path} is not in allowed directories`);
  }

  const octokit = getOctokit(token);

  const { data } = await octokit.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path,
    ref: BRANCH,
  });

  if (!Array.isArray(data)) {
    throw new Error('Path is not a directory');
  }

  return data.map((item) => `${item.name}${item.type === 'dir' ? '/' : ''}`);
}

export async function readFile(token: string, path: string): Promise<string> {
  if (!validatePath(path)) {
    throw new Error(`Access denied: ${path} is not in allowed directories`);
  }

  const octokit = getOctokit(token);

  const { data } = await octokit.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path,
    ref: BRANCH,
  });

  if (Array.isArray(data) || data.type !== 'file') {
    throw new Error('Path is not a file');
  }

  return Buffer.from(data.content, 'base64').toString('utf-8');
}

export async function writeFile(
  token: string,
  path: string,
  content: string,
  message: string
): Promise<{ sha: string; url: string }> {
  if (!validatePath(path)) {
    throw new Error(`Access denied: ${path} is not in allowed directories`);
  }

  const octokit = getOctokit(token);

  // Get current file SHA if it exists
  let sha: string | undefined;
  try {
    const { data } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path,
      ref: BRANCH,
    });
    if (!Array.isArray(data) && data.type === 'file') {
      sha = data.sha;
    }
  } catch {
    // File doesn't exist, creating new
  }

  const { data } = await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    message,
    content: Buffer.from(content).toString('base64'),
    branch: BRANCH,
    sha,
  });

  return {
    sha: data.content?.sha || '',
    url: data.content?.html_url || '',
  };
}

export async function commitMultipleFiles(
  token: string,
  files: GitHubFile[],
  message: string
): Promise<{ sha: string; url: string }> {
  // Validate all paths first
  for (const file of files) {
    if (!validatePath(file.path)) {
      throw new Error(`Access denied: ${file.path} is not in allowed directories`);
    }
  }

  const octokit = getOctokit(token);

  // 1. Get the current commit SHA
  const { data: ref } = await octokit.git.getRef({
    owner: OWNER,
    repo: REPO,
    ref: `heads/${BRANCH}`,
  });
  const currentCommitSha = ref.object.sha;

  // 2. Get the tree SHA of the current commit
  const { data: commit } = await octokit.git.getCommit({
    owner: OWNER,
    repo: REPO,
    commit_sha: currentCommitSha,
  });
  const baseTreeSha = commit.tree.sha;

  // 3. Create blobs for each file
  const blobs = await Promise.all(
    files.map(async (file) => {
      const { data } = await octokit.git.createBlob({
        owner: OWNER,
        repo: REPO,
        content: Buffer.from(file.content).toString('base64'),
        encoding: 'base64',
      });
      return { path: file.path, sha: data.sha };
    })
  );

  // 4. Create new tree
  const { data: newTree } = await octokit.git.createTree({
    owner: OWNER,
    repo: REPO,
    base_tree: baseTreeSha,
    tree: blobs.map((blob) => ({
      path: blob.path,
      mode: '100644' as const,
      type: 'blob' as const,
      sha: blob.sha,
    })),
  });

  // 5. Create new commit
  const { data: newCommit } = await octokit.git.createCommit({
    owner: OWNER,
    repo: REPO,
    message,
    tree: newTree.sha,
    parents: [currentCommitSha],
  });

  // 6. Update branch reference
  await octokit.git.updateRef({
    owner: OWNER,
    repo: REPO,
    ref: `heads/${BRANCH}`,
    sha: newCommit.sha,
  });

  return {
    sha: newCommit.sha,
    url: newCommit.html_url,
  };
}
