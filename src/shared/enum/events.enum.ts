/**
 * Available Discord events.
 *
 * @enum
 * @readonly
 */
export enum DiscordEvents {
  /**
   * Event triggered when a message is created.
   */
  messageCreate = 'messageCreate',

  /**
   * Event triggered when a message is updated.
   */
  messageUpdate = 'messageUpdate',

  /**
   * Event triggered when a message is deleted.
   */
  messageDelete = 'messageDelete',

  /**
   * Event triggered when a guild is created.
   */
  guildCreate = 'guildCreate',

  /**
   * Event triggered when a guild is updated.
   */
  guildUpdate = 'guildUpdate',

  /**
   * Event triggered when a guild is deleted.
   */
  guildDelete = 'guildDelete',

  /**
   * Event triggered when a member joins a guild.
   */
  guildMemberAdd = 'guildMemberAdd',

  /**
   * Event triggered when a member leaves or is removed from a guild.
   */
  guildMemberRemove = 'guildMemberRemove',

  /**
   * Event triggered for raw payload from the Discord gateway.
   */
  raw = 'raw',
}
