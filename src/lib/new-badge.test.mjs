import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  isNewContent,
  shouldShowNewBadge,
  parseFrontmatter,
  getNewUntilDate,
  hasExpiredBadge,
  removeBadgeFromContent,
  addNewBadgeToFrontmatter,
} from './new-badge.mjs';

describe('New Badge System', () => {
  describe('parseFrontmatter', () => {
    it('should parse valid frontmatter', () => {
      const content = `---
title: Test Page
isNew: true
---

Content here`;

      const result = parseFrontmatter(content);
      expect(result.frontmatter).toContain('title: Test Page');
      expect(result.frontmatter).toContain('isNew: true');
      expect(result.body).toContain('Content here');
    });

    it('should return null frontmatter for content without frontmatter', () => {
      const content = 'Just content, no frontmatter';
      const result = parseFrontmatter(content);
      expect(result.frontmatter).toBeNull();
    });
  });

  describe('getNewUntilDate', () => {
    it('should extract newUntil date from frontmatter', () => {
      const frontmatter = `title: Test
newUntil: "2026-02-15"`;

      const result = getNewUntilDate(frontmatter);
      expect(result).toEqual(new Date('2026-02-15'));
    });

    it('should handle unquoted dates', () => {
      const frontmatter = `title: Test
newUntil: 2026-02-15`;

      const result = getNewUntilDate(frontmatter);
      expect(result).toEqual(new Date('2026-02-15'));
    });

    it('should return null if no newUntil field', () => {
      const frontmatter = `title: Test`;
      const result = getNewUntilDate(frontmatter);
      expect(result).toBeNull();
    });
  });

  describe('isNewContent', () => {
    it('should return true if isNew is true and not expired', () => {
      const frontmatter = `title: Test
isNew: true
newUntil: "2099-12-31"`;

      expect(isNewContent(frontmatter)).toBe(true);
    });

    it('should return false if isNew is false', () => {
      const frontmatter = `title: Test
isNew: false`;

      expect(isNewContent(frontmatter)).toBe(false);
    });

    it('should return false if newUntil has passed', () => {
      const frontmatter = `title: Test
isNew: true
newUntil: "2020-01-01"`;

      expect(isNewContent(frontmatter)).toBe(false);
    });

    it('should return true if isNew is true with no expiration', () => {
      const frontmatter = `title: Test
isNew: true`;

      expect(isNewContent(frontmatter)).toBe(true);
    });
  });

  describe('shouldShowNewBadge', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-01-30'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should show badge when isNew is true and before expiration', () => {
      const data = {
        isNew: true,
        newUntil: '2026-02-15',
      };

      expect(shouldShowNewBadge(data)).toBe(true);
    });

    it('should not show badge when newUntil has passed', () => {
      const data = {
        isNew: true,
        newUntil: '2026-01-15',
      };

      expect(shouldShowNewBadge(data)).toBe(false);
    });

    it('should show badge when isNew is true with no expiration', () => {
      const data = {
        isNew: true,
      };

      expect(shouldShowNewBadge(data)).toBe(true);
    });

    it('should not show badge when isNew is false', () => {
      const data = {
        isNew: false,
        newUntil: '2099-12-31',
      };

      expect(shouldShowNewBadge(data)).toBe(false);
    });

    it('should not show badge when isNew is undefined', () => {
      const data = {};
      expect(shouldShowNewBadge(data)).toBe(false);
    });

    it('should handle addedDate for automatic new detection (within 14 days)', () => {
      const data = {
        addedDate: '2026-01-20', // 10 days ago
      };

      expect(shouldShowNewBadge(data)).toBe(true);
    });

    it('should not show badge for old addedDate (over 14 days)', () => {
      const data = {
        addedDate: '2026-01-01', // 29 days ago
      };

      expect(shouldShowNewBadge(data)).toBe(false);
    });
  });

  describe('hasExpiredBadge', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-01-30'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return true when newUntil date has passed', () => {
      const content = `---
title: Test
isNew: true
newUntil: "2026-01-15"
---
Content`;

      expect(hasExpiredBadge(content)).toBe(true);
    });

    it('should return false when newUntil date is in the future', () => {
      const content = `---
title: Test
isNew: true
newUntil: "2026-02-15"
---
Content`;

      expect(hasExpiredBadge(content)).toBe(false);
    });

    it('should return false when no newUntil field exists', () => {
      const content = `---
title: Test
---
Content`;

      expect(hasExpiredBadge(content)).toBe(false);
    });
  });

  describe('removeBadgeFromContent', () => {
    it('should remove isNew and newUntil fields', () => {
      const content = `---
title: Test
isNew: true
newUntil: "2026-01-15"
---
Content`;

      const result = removeBadgeFromContent(content);
      expect(result).not.toContain('isNew');
      expect(result).not.toContain('newUntil');
      expect(result).toContain('title: Test');
      expect(result).toContain('Content');
    });

    it('should remove sidebar.badge section', () => {
      const content = `---
title: Test
sidebar:
  order: 10
  badge:
    text: New
    variant: tip
isNew: true
newUntil: "2026-01-15"
---
Content`;

      const result = removeBadgeFromContent(content);
      expect(result).not.toContain('badge:');
      expect(result).not.toContain('text: New');
      expect(result).toContain('sidebar:');
      expect(result).toContain('order: 10');
    });

    it('should preserve other frontmatter fields', () => {
      const content = `---
title: Test Page
description: A test page
isNew: true
newUntil: "2026-01-15"
projectUrl: https://example.com
---
Content`;

      const result = removeBadgeFromContent(content);
      expect(result).toContain('title: Test Page');
      expect(result).toContain('description: A test page');
      expect(result).toContain('projectUrl: https://example.com');
    });
  });

  describe('addNewBadgeToFrontmatter', () => {
    it('should add isNew and sidebar.badge to frontmatter', () => {
      const content = `---
title: Test
---
Content`;

      const result = addNewBadgeToFrontmatter(content, '2026-02-15');
      expect(result).toContain('isNew: true');
      expect(result).toContain('newUntil: "2026-02-15"');
    });

    it('should add sidebar.badge with New text and tip variant', () => {
      const content = `---
title: Test
---
Content`;

      const result = addNewBadgeToFrontmatter(content, '2026-02-15');
      expect(result).toContain('badge:');
      expect(result).toContain('text: New');
      expect(result).toContain('variant: tip');
    });

    it('should merge with existing sidebar config', () => {
      const content = `---
title: Test
sidebar:
  order: 5
---
Content`;

      const result = addNewBadgeToFrontmatter(content, '2026-02-15');
      expect(result).toContain('order: 5');
      expect(result).toContain('badge:');
    });

    it('should default to 14 days expiration if no date provided', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-01-30'));

      const content = `---
title: Test
---
Content`;

      const result = addNewBadgeToFrontmatter(content);
      expect(result).toContain('newUntil: "2026-02-13"'); // 14 days from Jan 30

      vi.useRealTimers();
    });
  });
});
