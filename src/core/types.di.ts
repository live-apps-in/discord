export const TYPES = {
  /**Core Modules */
  Guild: Symbol.for('Guild'),

  /**App Service */
  GuildService: Symbol.for('GuildService'),
  UserService: Symbol.for('UserService'),

  /**API service */
  GuildAPI: Symbol.for('GuildAPI'),

  /**Shared Service */
  AxiosService: Symbol.for('AxiosService'),
  RedisService: Symbol.for('RedisService'),
  EventsHandler: Symbol.for('EventsHandler'),
};
