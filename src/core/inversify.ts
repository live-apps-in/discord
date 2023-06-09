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
import { MessageService } from '../modules/message/service/message.service';
import { MessageAPI } from '../api/discord/message';
import { RolesService } from '../modules/roles/service/roles.service';
import { RolesAPI } from '../api/discord/role.api';
import { ChannelService } from '../modules/channel/service/channel.service';
import { ChannelAPI } from '../api/discord/channel';
import { MemberService } from '../modules/member/service/member.service';
import { MemberAPI } from '../api/discord/member';
import { UserAPI } from '../api/discord/user';

const container = new Container();

/**Core Service */
container.bind<Guild>(TYPES.Guild).to(Guild);

/**App Service */
container.bind<GuildService>(TYPES.GuildService).to(GuildService);
container.bind<ChannelService>(TYPES.ChannelService).to(ChannelService);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<RolesService>(TYPES.RolesService).to(RolesService);
container.bind<MessageService>(TYPES.MessageService).to(MessageService);
container.bind<MemberService>(TYPES.MemberService).to(MemberService);

/**API Service */
container.bind<GuildAPI>(TYPES.GuildAPI).to(GuildAPI);
container.bind<ChannelAPI>(TYPES.ChannelAPI).to(ChannelAPI);
container.bind<MessageAPI>(TYPES.MessageAPI).to(MessageAPI);
container.bind<RolesAPI>(TYPES.RolesAPI).to(RolesAPI);
container.bind<MemberAPI>(TYPES.MemberAPI).to(MemberAPI);
container.bind<UserAPI>(TYPES.UserAPI).to(UserAPI);

/**Shared Service */
container.bind<AxiosService>(TYPES.AxiosService).to(AxiosService);
container.bind<RedisService>(TYPES.RedisService).to(RedisService);
container.bind<EventsHandler>(TYPES.EventsHandler).to(EventsHandler);
container
  .bind<DiscordRateLimiter>(TYPES.DiscordRateLimiter)
  .to(DiscordRateLimiter);

export default container;
