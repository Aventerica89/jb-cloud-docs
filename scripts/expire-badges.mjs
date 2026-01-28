#!/usr/bin/env node
/**
 * Badge Expiration Script
 *
 * Removes sidebar.badge from docs where newUntil date has passed.
 * Intended to run via GitHub Actions daily at midnight UTC.
 *
 * Usage:
 *   node scripts/expire-badges.mjs
 *   node scripts/expire-badges.mjs --dry-run  # Preview changes without modifying files
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const DOCS_DIR = join(ROOT, 'src/content/docs');

const isDryRun = process.argv.includes('--dry-run');

/**
 * Recursively get all markdown/mdx files in a directory
 */
function getAllDocFiles(dir, files = []) {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      getAllDocFiles(fullPath, files);
    } else if (['.md', '.mdx'].includes(extname(entry))) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Parse frontmatter from file content
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: null, body: content, raw: '' };

  return {
    frontmatter: match[1],
    body: content.slice(match[0].length),
    raw: match[0],
  };
}

/**
 * Check if a file has an expired newUntil date
 */
function hasExpiredBadge(content) {
  const { frontmatter } = parseFrontmatter(content);
  if (!frontmatter) return false;

  // Check for newUntil field
  const newUntilMatch = frontmatter.match(/newUntil:\s*["']?(\d{4}-\d{2}-\d{2})["']?/);
  if (!newUntilMatch) return false;

  const newUntilDate = new Date(newUntilMatch[1]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return newUntilDate < today;
}

/**
 * Remove sidebar.badge section and related fields from frontmatter
 */
function removeBadgeFromContent(content) {
  const { frontmatter, body } = parseFrontmatter(content);
  if (!frontmatter) return content;

  let updatedFrontmatter = frontmatter;

  // Remove isNew field
  updatedFrontmatter = updatedFrontmatter.replace(/isNew:\s*true\n?/g, '');

  // Remove newUntil field
  updatedFrontmatter = updatedFrontmatter.replace(/newUntil:\s*["']?\d{4}-\d{2}-\d{2}["']?\n?/g, '');

  // Remove sidebar.badge section (handles multi-line YAML)
  // Pattern for inline badge
  updatedFrontmatter = updatedFrontmatter.replace(
    /sidebar:\s*\n\s+badge:\s*\n\s+text:\s*["']?New["']?\n\s+variant:\s*\w+\n?/g,
    ''
  );

  // Pattern for sidebar with just badge
  updatedFrontmatter = updatedFrontmatter.replace(
    /sidebar:\s*\n\s+badge:\s*["']?New["']?\n?/g,
    ''
  );

  // Remove empty sidebar section if it only had badge
  updatedFrontmatter = updatedFrontmatter.replace(/sidebar:\s*\n(?=\n|---)/g, '');

  // Clean up multiple consecutive newlines
  updatedFrontmatter = updatedFrontmatter.replace(/\n{3,}/g, '\n\n');

  // Trim trailing whitespace from frontmatter
  updatedFrontmatter = updatedFrontmatter.trim();

  return `---\n${updatedFrontmatter}\n---${body}`;
}

function main() {
  console.log('Checking for expired badges...\n');
  if (isDryRun) {
    console.log('DRY RUN MODE - No files will be modified\n');
  }

  const allFiles = getAllDocFiles(DOCS_DIR);
  const expiredFiles = [];

  for (const file of allFiles) {
    try {
      const content = readFileSync(file, 'utf-8');

      if (hasExpiredBadge(content)) {
        const relativePath = relative(ROOT, file);
        expiredFiles.push({ file, relativePath });

        if (isDryRun) {
          console.log(`  [expired] ${relativePath}`);
        } else {
          const updatedContent = removeBadgeFromContent(content);
          writeFileSync(file, updatedContent, 'utf-8');
          console.log(`  [updated] ${relativePath}`);
        }
      }
    } catch (error) {
      console.error(`  [error] Failed to process ${relative(ROOT, file)}: ${error.message}`);
    }
  }

  console.log('');

  if (expiredFiles.length === 0) {
    console.log('No expired badges found.\n');
  } else if (isDryRun) {
    console.log(`Found ${expiredFiles.length} file(s) with expired badges.`);
    console.log('Run without --dry-run to update them.\n');
  } else {
    console.log(`Updated ${expiredFiles.length} file(s) with expired badges.\n`);
  }

  process.exit(0);
}

main();
