/**
 * Shared options for all fetch request
 *
 * @interface options
 */
export interface options {
  /**
   * Pass expiry (seconds) to set expiry in Redis on next API fetch
   * Default Expiry (1 day)
   */
  expiry?: number;

  /**
   * Specifies whether to ignore cache or not.
   */
  ignoreCache?: boolean;

  /**
   * Only fetch cache
   */
  onlyCache?: boolean;
}
