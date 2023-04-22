export const TYPES = {
  /**Core Modules */
  Guild: Symbol.for('Guild'),
  Channel: Symbol.for('Channel'),

  /**App Service */
  GuildService: Symbol.for('GuildService'),
  ChannelService: Symbol.for('ChannelService'),
  UserService: Symbol.for('UserService'),

  /**API service */
  GuildAPI: Symbol.for('GuildAPI'),
  ChannelAPI: Symbol.for('ChannelAPI'),

  /**Shared Service */
  AxiosService: Symbol.for('AxiosService'),
  RedisService: Symbol.for('RedisService'),
  EventsHandler: Symbol.for('EventsHandler'),
  DiscordRateLimiter: Symbol.for('DiscordRateLimiter'),
};
