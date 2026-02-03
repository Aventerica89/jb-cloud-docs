import { useState, useMemo } from 'react';
import commandsData from '../data/commands.json';
import styles from './CommandBrowser.module.css';

interface Command {
  name: string;
  description: string;
  platform: string;
  category: string;
  install: string;
  usage: string;
  flags: string[];
  docs: string;
}

interface Platform {
  id: string;
  name: string;
  color: string;
}

interface Category {
  id: string;
  name: string;
}

const { commands, platforms, categories } = commandsData as {
  commands: Command[];
  platforms: Platform[];
  categories: Category[];
};

export default function CommandBrowser() {
  const [search, setSearch] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const filteredCommands = useMemo(() => {
    return commands.filter((cmd) => {
      const matchesSearch =
        search === '' ||
        cmd.name.toLowerCase().includes(search.toLowerCase()) ||
        cmd.description.toLowerCase().includes(search.toLowerCase());

      const matchesPlatform =
        selectedPlatforms.length === 0 || selectedPlatforms.includes(cmd.platform);

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(cmd.category);

      return matchesSearch && matchesPlatform && matchesCategory;
    });
  }, [search, selectedPlatforms, selectedCategories]);

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    );
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const copyToClipboard = async (text: string, commandName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommand(commandName);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedPlatforms([]);
    setSelectedCategories([]);
  };

  // Memoized lookup maps for O(1) access instead of O(n) find() calls
  const platformMap = useMemo(
    () => new Map(platforms.map((p) => [p.id, p])),
    []
  );
  const categoryMap = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    []
  );

  const getPlatformInfo = (platformId: string): Platform | undefined =>
    platformMap.get(platformId);

  const getCategoryInfo = (categoryId: string): Category | undefined =>
    categoryMap.get(categoryId);

  return (
    <div className={styles.commandBrowser}>
      {/* Search */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search commands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        {(search || selectedPlatforms.length > 0 || selectedCategories.length > 0) && (
          <button onClick={clearFilters} className={styles.clearBtn}>
            Clear filters
          </button>
        )}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Platform:</span>
          <div className={styles.filterChips}>
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`${styles.filterChip} ${selectedPlatforms.includes(platform.id) ? styles.filterChipActive : ''}`}
                style={{
                  '--chip-color': platform.color,
                } as React.CSSProperties}
              >
                {platform.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Category:</span>
          <div className={styles.filterChips}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`${styles.filterChip} ${selectedCategories.includes(category.id) ? styles.filterChipActive : ''}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className={styles.resultsCount}>
        Showing {filteredCommands.length} of {commands.length} commands
      </div>

      {/* Commands list */}
      <div className={styles.commandsList}>
        {filteredCommands.map((cmd) => {
          const platform = getPlatformInfo(cmd.platform);
          const category = getCategoryInfo(cmd.category);

          return (
            <div key={cmd.name} className={styles.commandCard}>
              <div className={styles.commandHeader}>
                <code className={styles.commandName}>{cmd.name}</code>
                <div className={styles.commandTags}>
                  {platform && (
                    <span
                      className={`${styles.tag} ${styles.platformTag}`}
                      style={{ backgroundColor: platform.color }}
                    >
                      {platform.name}
                    </span>
                  )}
                  {category && (
                    <span className={`${styles.tag} ${styles.categoryTag}`}>
                      {category.name}
                    </span>
                  )}
                </div>
              </div>

              <p className={styles.commandDescription}>{cmd.description}</p>

              <div className={styles.commandUsage}>
                <div className={styles.usageHeader}>
                  <span>Usage:</span>
                  <button
                    onClick={() => copyToClipboard(cmd.usage, cmd.name)}
                    className={styles.copyBtn}
                    title="Copy to clipboard"
                  >
                    {copiedCommand === cmd.name ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <code className={styles.usageCode}>{cmd.usage}</code>
              </div>

              {cmd.flags.length > 0 && (
                <div className={styles.commandFlags}>
                  <span className={styles.flagsLabel}>Flags:</span>
                  <div className={styles.flagsList}>
                    {cmd.flags.map((flag) => (
                      <code key={flag} className={styles.flag}>
                        {flag}
                      </code>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.commandFooter}>
                <a href={cmd.docs} className={styles.docsLink}>
                  View docs
                </a>
                <button
                  onClick={() => copyToClipboard(cmd.install, `install-${cmd.name}`)}
                  className={styles.installBtn}
                >
                  {copiedCommand === `install-${cmd.name}` ? 'Copied!' : cmd.install}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCommands.length === 0 && (
        <div className={styles.noResults}>
          <p>No commands match your filters.</p>
          <button onClick={clearFilters} className={styles.clearBtn}>
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
