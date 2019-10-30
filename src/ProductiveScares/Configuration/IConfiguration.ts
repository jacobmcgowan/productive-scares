/**
 * Defines the user configuration of ProductiveScares.
 */
export interface IConfiguration {
  /**
   * The minimum time to wait before scaring the user.
   */
  readonly frequencyMin: number;
  /**
   * The maximum time to wait before scaring the user.
   */
  readonly frequencyMax: number;
}
