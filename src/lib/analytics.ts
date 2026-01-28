/**
 * Cloudflare Analytics API Client
 *
 * Fetches page view data from Cloudflare Analytics Engine via GraphQL API.
 * Used to determine popular pages for sidebar badges.
 */

interface CloudflareAnalyticsConfig {
  zoneId: string;
  apiToken: string;
}

interface PageViewData {
  path: string;
  views: number;
}

interface GraphQLResponse {
  data?: {
    viewer?: {
      zones?: Array<{
        httpRequestsAdaptiveGroups?: Array<{
          count: number;
          dimensions: {
            clientRequestPath: string;
          };
        }>;
      }>;
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

/**
 * Cloudflare Analytics client for fetching page view data
 */
export class CloudflareAnalytics {
  private readonly zoneId: string;
  private readonly apiToken: string;
  private readonly apiEndpoint = 'https://api.cloudflare.com/client/v4/graphql';

  constructor(config: CloudflareAnalyticsConfig) {
    this.zoneId = config.zoneId;
    this.apiToken = config.apiToken;
  }

  /**
   * Fetch page views for the last N days
   */
  async getPageViews(days: number = 30): Promise<PageViewData[]> {
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

    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiToken}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          zoneTag: this.zoneId,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Cloudflare API error: ${response.status} ${response.statusText}`);
    }

    const result: GraphQLResponse = await response.json();

    if (result.errors && result.errors.length > 0) {
      throw new Error(`GraphQL errors: ${result.errors.map((e) => e.message).join(', ')}`);
    }

    const groups = result.data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups ?? [];

    return groups
      .filter((group) => {
        const path = group.dimensions.clientRequestPath;
        // Filter out non-doc pages and static assets
        return (
          path.startsWith('/') &&
          !path.includes('.') &&
          !path.startsWith('/api/') &&
          !path.startsWith('/_')
        );
      })
      .map((group) => ({
        path: group.dimensions.clientRequestPath,
        views: group.count,
      }));
  }

  /**
   * Get the top N most popular pages
   */
  async getTopPages(count: number = 10, days: number = 30): Promise<PageViewData[]> {
    const pageViews = await this.getPageViews(days);
    return pageViews.slice(0, count);
  }
}

/**
 * Create a Cloudflare Analytics client from environment variables
 */
export function createAnalyticsClient(): CloudflareAnalytics | null {
  const zoneId = process.env.CF_ZONE_ID;
  const apiToken = process.env.CF_API_TOKEN;

  if (!zoneId || !apiToken) {
    console.warn('Cloudflare Analytics not configured: Missing CF_ZONE_ID or CF_API_TOKEN');
    return null;
  }

  return new CloudflareAnalytics({ zoneId, apiToken });
}
