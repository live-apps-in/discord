/**
 * Edit Guild channel
 *
 * @interface IEditChannel
 */
export interface IEditChannel {
  /**
   * The new name of the channel.
   * @type {string}
   */
  name?: string;

  /**
   * The new topic of the channel.
   *
   * @type {string}
   */
  topic?: string;
}
