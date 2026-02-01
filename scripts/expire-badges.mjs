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
import { hasExpiredBadge, removeBadgeFromContent } from '../src/lib/new-badge.mjs';

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
