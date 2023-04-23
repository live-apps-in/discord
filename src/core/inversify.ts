import 'reflect-metadata';
import { Container } from 'inversify';
import { AxiosService } from '../modules/shared/axios.service';
import { TYPES } from './types.di';
import { UserService } from '../modules/users/service/user.service';
import { GuildAPI } from '../api/discord/guild';
import { GuildService } from '../modules/guild/service/guild.service';
import { RedisService } from '../modules/shared/redis/redis.service';
import { Guild } from '../modules/guild/guild';
import { EventsHandler } from '../modules/events/events.handlers';
import { DiscordRateLimiter } from '../modules/shared/rate_limiter';
import { MessageService } from '../modules/message/service/channel.service';
import { MessageAPI } from '../api/discord/message';

const container = new Container();
/**Core Service */
container.bind<Guild>(TYPES.Guild).to(Guild);

/**App Service */
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<GuildService>(TYPES.GuildService).to(GuildService);
container.bind<MessageService>(TYPES.MessageService).to(MessageService);

/**API Service */
container.bind<GuildAPI>(TYPES.GuildAPI).to(GuildAPI);
container.bind<MessageAPI>(TYPES.MessageAPI).to(MessageAPI);

/**Shared Service */
container.bind<AxiosService>(TYPES.AxiosService).to(AxiosService);
container.bind<RedisService>(TYPES.RedisService).to(RedisService);
container.bind<EventsHandler>(TYPES.EventsHandler).to(EventsHandler);
container
  .bind<DiscordRateLimiter>(TYPES.DiscordRateLimiter)
  .to(DiscordRateLimiter);

export default container;
