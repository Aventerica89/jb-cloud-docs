/**
 * New Badge System Utilities
 *
 * Provides functions for managing "New" badges on documentation pages.
 * Supports automatic expiration and consistent badge display.
 */

/**
 * Parse frontmatter from file content
 * @param {string} content - Full file content with frontmatter
 * @returns {{ frontmatter: string | null, body: string, raw: string }}
 */
export function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: null, body: content, raw: '' };

  return {
    frontmatter: match[1],
    body: content.slice(match[0].length),
    raw: match[0],
  };
}

/**
 * Extract newUntil date from frontmatter
 * @param {string} frontmatter - Frontmatter content
 * @returns {Date | null}
 */
export function getNewUntilDate(frontmatter) {
  if (!frontmatter) return null;

  const match = frontmatter.match(/newUntil:\s*["']?(\d{4}-\d{2}-\d{2})["']?/);
  if (!match) return null;

  return new Date(match[1]);
}

/**
 * Check if content is marked as new based on frontmatter
 * @param {string} frontmatter - Frontmatter content
 * @returns {boolean}
 */
export function isNewContent(frontmatter) {
  if (!frontmatter) return false;

  // Check if isNew is explicitly set to true
  const isNewMatch = frontmatter.match(/isNew:\s*(true|false)/);
  if (!isNewMatch || isNewMatch[1] !== 'true') return false;

  // Check if newUntil has passed
  const newUntilDate = getNewUntilDate(frontmatter);
  if (newUntilDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newUntilDate < today) return false;
  }

  return true;
}

/**
 * Determine if a page should show the "New" badge
 * Works with parsed frontmatter data object
 * @param {Object} data - Frontmatter data object
 * @param {boolean} [data.isNew] - Explicit new flag
 * @param {string} [data.newUntil] - Expiration date (YYYY-MM-DD)
 * @param {string} [data.addedDate] - Date content was added (YYYY-MM-DD)
 * @returns {boolean}
 */
export function shouldShowNewBadge(data) {
  if (!data) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // If isNew is explicitly set
  if (data.isNew !== undefined) {
    if (!data.isNew) return false;

    // Check expiration
    if (data.newUntil) {
      const expireDate = new Date(data.newUntil);
      if (expireDate < today) return false;
    }

    return true;
  }

  // Auto-detect based on addedDate (within 14 days)
  if (data.addedDate) {
    const addedDate = new Date(data.addedDate);
    const daysSinceAdded = Math.floor(
      (today.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSinceAdded <= 14;
  }

  return false;
}

/**
 * Check if a file has an expired newUntil date
 * @param {string} content - Full file content
 * @returns {boolean}
 */
export function hasExpiredBadge(content) {
  const { frontmatter } = parseFrontmatter(content);
  if (!frontmatter) return false;

  const newUntilDate = getNewUntilDate(frontmatter);
  if (!newUntilDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return newUntilDate < today;
}

/**
 * Remove badge-related fields from content
 * @param {string} content - Full file content
 * @returns {string} Updated content
 */
export function removeBadgeFromContent(content) {
  const { frontmatter, body } = parseFrontmatter(content);
  if (!frontmatter) return content;

  let updatedFrontmatter = frontmatter;

  // Remove isNew field
  updatedFrontmatter = updatedFrontmatter.replace(/isNew:\s*true\n?/g, '');

  // Remove newUntil field
  updatedFrontmatter = updatedFrontmatter.replace(
    /newUntil:\s*["']?\d{4}-\d{2}-\d{2}["']?\n?/g,
    ''
  );

  // Remove sidebar.badge section (handles multi-line YAML)
  // Pattern for badge with text and variant
  updatedFrontmatter = updatedFrontmatter.replace(
    /(\s+)badge:\s*\n\s+text:\s*["']?New["']?\n\s+variant:\s*\w+\n?/g,
    '\n'
  );

  // Pattern for inline badge
  updatedFrontmatter = updatedFrontmatter.replace(
    /(\s+)badge:\s*["']?New["']?\n?/g,
    '\n'
  );

  // Clean up multiple consecutive newlines
  updatedFrontmatter = updatedFrontmatter.replace(/\n{3,}/g, '\n\n');

  // Trim trailing whitespace from frontmatter
  updatedFrontmatter = updatedFrontmatter.trim();

  return `---\n${updatedFrontmatter}\n---${body}`;
}

/**
 * Add "New" badge to frontmatter
 * @param {string} content - Full file content
 * @param {string} [newUntil] - Expiration date (YYYY-MM-DD), defaults to 14 days from now
 * @returns {string} Updated content
 */
export function addNewBadgeToFrontmatter(content, newUntil) {
  const { frontmatter, body } = parseFrontmatter(content);
  if (!frontmatter) return content;

  // Calculate default expiration (14 days from now)
  if (!newUntil) {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 14);
    newUntil = expireDate.toISOString().split('T')[0];
  }

  let updatedFrontmatter = frontmatter;

  // Add isNew and newUntil if not present
  if (!updatedFrontmatter.includes('isNew:')) {
    updatedFrontmatter += `\nisNew: true`;
  }
  if (!updatedFrontmatter.includes('newUntil:')) {
    updatedFrontmatter += `\nnewUntil: "${newUntil}"`;
  }

  // Add or update sidebar.badge
  if (updatedFrontmatter.includes('sidebar:')) {
    // Check if badge already exists
    if (!updatedFrontmatter.includes('badge:')) {
      // Insert badge after sidebar:
      updatedFrontmatter = updatedFrontmatter.replace(
        /(sidebar:\s*\n)/,
        '$1  badge:\n    text: New\n    variant: tip\n'
      );
    }
  } else {
    // Add sidebar section with badge
    updatedFrontmatter += `\nsidebar:\n  badge:\n    text: New\n    variant: tip`;
  }

  // Clean up formatting
  updatedFrontmatter = updatedFrontmatter.trim();

  return `---\n${updatedFrontmatter}\n---${body}`;
}

/**
 * Get days until badge expires
 * @param {string} newUntil - Expiration date (YYYY-MM-DD)
 * @returns {number} Days until expiration (negative if expired)
 */
export function getDaysUntilExpiration(newUntil) {
  if (!newUntil) return Infinity;

  const expireDate = new Date(newUntil);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Math.floor(
    (expireDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
}
