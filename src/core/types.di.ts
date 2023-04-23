export const TYPES = {
  /**Core Modules */
  Guild: Symbol.for('Guild'),
  Message: Symbol.for('Message'),
  Roles: Symbol.for('Roles'),

  /**App Service */
  GuildService: Symbol.for('GuildService'),
  MessageService: Symbol.for('MessageService'),
  RolesService: Symbol.for('RolesService'),
  UserService: Symbol.for('UserService'),

  /**API service */
  GuildAPI: Symbol.for('GuildAPI'),
  MessageAPI: Symbol.for('MessageAPI'),
  RolesAPI: Symbol.for('RolesAPI'),

  /**Shared Service */
  AxiosService: Symbol.for('AxiosService'),
  RedisService: Symbol.for('RedisService'),
  EventsHandler: Symbol.for('EventsHandler'),
  DiscordRateLimiter: Symbol.for('DiscordRateLimiter'),
};
