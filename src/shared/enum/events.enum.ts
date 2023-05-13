/**
 * List of allowed Discord Events
 * @enum {string}
 */
export enum DiscordEvents {
  messageCreate = 'messageCreate',
  messageUpdate = 'messageUpdate',
  messageDelete = 'messageDelete',
  guildCreate = 'guildCreate',
  guildUpdate = 'guildUpdate',
  guildDelete = 'guildDelete',
  guildMemberAdd = 'guildMemberAdd',
  guildMemberRemove = 'guildMemberRemove',
  raw = 'raw',
}
