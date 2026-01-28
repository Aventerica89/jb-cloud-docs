#!/usr/bin/env node
/**
 * Popularity Update Script
 *
 * Fetches Cloudflare Analytics data and updates popularity.json.
 * Intended to run via GitHub Actions daily at 6 AM UTC.
 *
 * Required environment variables:
 *   - CF_ZONE_ID: Cloudflare Zone ID
 *   - CF_API_TOKEN: Cloudflare API token with Analytics:Read permission
 *
 * Usage:
 *   node scripts/update-popularity.mjs
 *   node scripts/update-popularity.mjs --dry-run  # Fetch data without saving
 */

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const DATA_FILE = join(ROOT, 'src/data/popularity.json');

const isDryRun = process.argv.includes('--dry-run');

const CF_ZONE_ID = process.env.CF_ZONE_ID;
const CF_API_TOKEN = process.env.CF_API_TOKEN;
const API_ENDPOINT = 'https://api.cloudflare.com/client/v4/graphql';

/**
 * Fetch page views from Cloudflare Analytics
 */
async function fetchPageViews(days = 30) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const query = `
    query GetPageViews($zoneTag: String!, $startDate: Date!, $endDate: Date!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequestsAdaptiveGroups(
            filter: {
              datetime_gt: $startDate
              datetime_lt: $endDate
              requestSource: "eyeball"
              clientRequestPath_like: "/%"
            }
            limit: 100
            orderBy: [count_DESC]
          ) {
            count
            dimensions {
              clientRequestPath
            }
          }
        }
      }
    }
  `;

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CF_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        zoneTag: CF_ZONE_ID,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Cloudflare API error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(`GraphQL errors: ${result.errors.map((e) => e.message).join(', ')}`);
  }

  const groups = result.data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups ?? [];

  return groups
    .filter((group) => {
      const path = group.dimensions.clientRequestPath;
      // Filter to only doc pages (exclude static assets, API routes, etc.)
      return (
        path.startsWith('/') &&
        !path.includes('.') &&
        !path.startsWith('/api/') &&
        !path.startsWith('/_') &&
        path !== '/' // Exclude homepage from "popular" since it's always visited
      );
    })
    .map((group) => ({
      path: group.dimensions.clientRequestPath,
      views: group.count,
    }));
}

/**
 * Normalize paths to match doc slugs
 */
function normalizePath(path) {
  // Remove trailing slash
  return path.replace(/\/$/, '') || '/';
}

async function main() {
  console.log('Updating popularity data...\n');

  if (!CF_ZONE_ID || !CF_API_TOKEN) {
    console.log('Cloudflare Analytics not configured.');
    console.log('Set CF_ZONE_ID and CF_API_TOKEN environment variables.\n');

    // Write empty data if not configured
    if (!isDryRun) {
      const emptyData = {
        lastUpdated: new Date().toISOString(),
        topPages: [],
        error: 'Analytics not configured',
      };
      writeFileSync(DATA_FILE, JSON.stringify(emptyData, null, 2) + '\n');
      console.log('Wrote empty popularity.json\n');
    }
    process.exit(0);
  }

  if (isDryRun) {
    console.log('DRY RUN MODE - Data will not be saved\n');
  }

  try {
    console.log('Fetching analytics data from Cloudflare...');
    const pageViews = await fetchPageViews(30);

    // Get top 10 pages
    const topPages = pageViews.slice(0, 10).map((page) => ({
      path: normalizePath(page.path),
      views: page.views,
    }));

    console.log(`\nTop ${topPages.length} pages by views:\n`);
    topPages.forEach((page, i) => {
      console.log(`  ${i + 1}. ${page.path} (${page.views.toLocaleString()} views)`);
    });

    if (isDryRun) {
      console.log('\nDry run complete. No changes made.\n');
    } else {
      const data = {
        lastUpdated: new Date().toISOString(),
        topPages,
      };

      writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n');
      console.log(`\nUpdated ${DATA_FILE}\n`);
    }
  } catch (error) {
    console.error(`\nError fetching analytics: ${error.message}\n`);

    if (!isDryRun) {
      // Read existing data
      let existingData = { topPages: [] };
      try {
        existingData = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
      } catch {
        // File doesn't exist or is invalid
      }

      // Update with error but keep existing data
      const data = {
        ...existingData,
        lastUpdated: new Date().toISOString(),
        lastError: error.message,
      };

      writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n');
      console.log('Kept existing data and logged error.\n');
    }

    process.exit(1);
  }

  process.exit(0);
}

main();
