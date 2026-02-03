import { useState, useMemo } from 'react';
import commandsData from '../data/commands.json';

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

  const getPlatformInfo = (platformId: string): Platform | undefined =>
    platforms.find((p) => p.id === platformId);

  const getCategoryInfo = (categoryId: string): Category | undefined =>
    categories.find((c) => c.id === categoryId);

  return (
    <div className="command-browser">
      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search commands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        {(search || selectedPlatforms.length > 0 || selectedCategories.length > 0) && (
          <button onClick={clearFilters} className="clear-btn">
            Clear filters
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <span className="filter-label">Platform:</span>
          <div className="filter-chips">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`filter-chip ${selectedPlatforms.includes(platform.id) ? 'active' : ''}`}
                style={{
                  '--chip-color': platform.color,
                } as React.CSSProperties}
              >
                {platform.name}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Category:</span>
          <div className="filter-chips">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`filter-chip ${selectedCategories.includes(category.id) ? 'active' : ''}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="results-count">
        Showing {filteredCommands.length} of {commands.length} commands
      </div>

      {/* Commands list */}
      <div className="commands-list">
        {filteredCommands.map((cmd) => {
          const platform = getPlatformInfo(cmd.platform);
          const category = getCategoryInfo(cmd.category);

          return (
            <div key={cmd.name} className="command-card">
              <div className="command-header">
                <code className="command-name">{cmd.name}</code>
                <div className="command-tags">
                  {platform && (
                    <span
                      className="tag platform-tag"
                      style={{ backgroundColor: platform.color }}
                    >
                      {platform.name}
                    </span>
                  )}
                  {category && <span className="tag category-tag">{category.name}</span>}
                </div>
              </div>

              <p className="command-description">{cmd.description}</p>

              <div className="command-usage">
                <div className="usage-header">
                  <span>Usage:</span>
                  <button
                    onClick={() => copyToClipboard(cmd.usage, cmd.name)}
                    className="copy-btn"
                    title="Copy to clipboard"
                  >
                    {copiedCommand === cmd.name ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <code className="usage-code">{cmd.usage}</code>
              </div>

              {cmd.flags.length > 0 && (
                <div className="command-flags">
                  <span className="flags-label">Flags:</span>
                  <div className="flags-list">
                    {cmd.flags.map((flag) => (
                      <code key={flag} className="flag">
                        {flag}
                      </code>
                    ))}
                  </div>
                </div>
              )}

              <div className="command-footer">
                <a href={cmd.docs} className="docs-link">
                  View docs
                </a>
                <button
                  onClick={() => copyToClipboard(cmd.install, `install-${cmd.name}`)}
                  className="install-btn"
                >
                  {copiedCommand === `install-${cmd.name}` ? 'Copied!' : cmd.install}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCommands.length === 0 && (
        <div className="no-results">
          <p>No commands match your filters.</p>
          <button onClick={clearFilters} className="clear-btn">
            Clear all filters
          </button>
        </div>
      )}

      <style>{`
        .command-browser {
          font-family: var(--sl-font-system);
        }

        .search-container {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .search-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid var(--sl-color-gray-5);
          border-radius: 0.5rem;
          background: var(--sl-color-bg);
          color: var(--sl-color-text);
          font-size: 1rem;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--sl-color-accent);
          box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.2);
        }

        .clear-btn {
          padding: 0.75rem 1rem;
          border: 1px solid var(--sl-color-gray-5);
          border-radius: 0.5rem;
          background: transparent;
          color: var(--sl-color-text);
          cursor: pointer;
          white-space: nowrap;
        }

        .clear-btn:hover {
          background: var(--sl-color-gray-6);
        }

        .filters {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .filter-group {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .filter-label {
          font-weight: 500;
          color: var(--sl-color-gray-2);
          min-width: 80px;
          padding-top: 0.5rem;
        }

        .filter-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .filter-chip {
          padding: 0.4rem 0.75rem;
          border: 1px solid var(--sl-color-gray-5);
          border-radius: 2rem;
          background: transparent;
          color: var(--sl-color-text);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .filter-chip:hover {
          border-color: var(--sl-color-accent);
        }

        .filter-chip.active {
          background: var(--chip-color, var(--sl-color-accent));
          border-color: var(--chip-color, var(--sl-color-accent));
          color: white;
        }

        .results-count {
          font-size: 0.875rem;
          color: var(--sl-color-gray-3);
          margin-bottom: 1rem;
        }

        .commands-list {
          display: grid;
          gap: 1rem;
        }

        .command-card {
          border: 1px solid var(--sl-color-gray-5);
          border-radius: 0.75rem;
          padding: 1.25rem;
          background: var(--sl-color-bg);
        }

        .command-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }

        .command-name {
          font-size: 1rem;
          font-weight: 600;
          color: var(--sl-color-accent);
          background: rgba(99, 91, 255, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
        }

        .command-tags {
          display: flex;
          gap: 0.5rem;
        }

        .tag {
          padding: 0.2rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .platform-tag {
          color: white;
        }

        .category-tag {
          background: var(--sl-color-gray-6);
          color: var(--sl-color-gray-2);
        }

        .command-description {
          color: var(--sl-color-gray-2);
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .command-usage {
          background: var(--sl-color-gray-6);
          border-radius: 0.5rem;
          padding: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .usage-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          font-size: 0.75rem;
          color: var(--sl-color-gray-3);
        }

        .copy-btn {
          padding: 0.25rem 0.5rem;
          border: none;
          border-radius: 0.25rem;
          background: var(--sl-color-gray-5);
          color: var(--sl-color-text);
          font-size: 0.75rem;
          cursor: pointer;
        }

        .copy-btn:hover {
          background: var(--sl-color-accent);
          color: white;
        }

        .usage-code {
          display: block;
          font-size: 0.875rem;
          word-break: break-all;
        }

        .command-flags {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }

        .flags-label {
          font-size: 0.75rem;
          color: var(--sl-color-gray-3);
        }

        .flags-list {
          display: flex;
          gap: 0.25rem;
          flex-wrap: wrap;
        }

        .flag {
          padding: 0.15rem 0.4rem;
          background: var(--sl-color-gray-6);
          border-radius: 0.25rem;
          font-size: 0.75rem;
          color: var(--sl-color-gray-2);
        }

        .command-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid var(--sl-color-gray-6);
        }

        .docs-link {
          font-size: 0.875rem;
          color: var(--sl-color-accent);
          text-decoration: none;
        }

        .docs-link:hover {
          text-decoration: underline;
        }

        .install-btn {
          padding: 0.4rem 0.75rem;
          border: 1px solid var(--sl-color-gray-5);
          border-radius: 0.25rem;
          background: transparent;
          color: var(--sl-color-text);
          font-size: 0.75rem;
          font-family: var(--sl-font-mono);
          cursor: pointer;
        }

        .install-btn:hover {
          border-color: var(--sl-color-accent);
          color: var(--sl-color-accent);
        }

        .no-results {
          text-align: center;
          padding: 2rem;
          color: var(--sl-color-gray-3);
        }

        .no-results p {
          margin-bottom: 1rem;
        }

        @media (max-width: 640px) {
          .filter-group {
            flex-direction: column;
          }

          .filter-label {
            min-width: auto;
            padding-top: 0;
          }

          .command-header {
            flex-direction: column;
          }

          .command-footer {
            flex-direction: column;
            gap: 0.75rem;
          }

          .install-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
