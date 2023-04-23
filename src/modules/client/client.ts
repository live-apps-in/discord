import { User } from '../users/user';
import { UserService } from '../users/service/user.service';
import { TYPES } from '../../core/types.di';
import { GuildService } from '../guild/service/guild.service';
import { Guild } from '../guild/guild';
import container from '../../core/inversify';
import { EventEmitter } from 'events';
import '../shared/redis/redis.provider';
import { RedisProvider } from '../shared/redis/redis.provider';
import { RedisService } from '../shared/redis/redis.service';
import { configStore } from '../../shared/store/config.store';
import { SocketClient } from '../sockets/socket.client';
import { ClientOptions } from './interface/client.interface';
import { Message } from '../message/message';
import { MessageService } from '../message/service/message.service';
import { Roles } from '../roles/roles';
import { RolesService } from '../roles/service/roles.service';
import { ChannelService } from '../channel/service/channel.service';
import { Channel } from '../channel/channel';

///Service
const guildService = container.get<GuildService>(TYPES.GuildService);
const channelService = container.get<ChannelService>(TYPES.ChannelService);
const messageService = container.get<MessageService>(TYPES.MessageService);
const userService = container.get<UserService>(TYPES.UserService);
const rolesService = container.get<RolesService>(TYPES.RolesService);
const redisService = container.get<RedisService>(TYPES.RedisService);

export class Client extends EventEmitter {
  /**Exposed to users */
  public guild: Guild;
  public channel: Channel;
  public message: Message;
  public roles: Roles;
  public user: User;

  /**App config */
  private options: ClientOptions;

  constructor(options: ClientOptions) {
    super();
    /**Public */
    this.options = options;
    configStore.clientOptions = options;
    this.guild = new Guild(guildService, redisService);
    this.channel = new Channel(channelService);
    this.message = new Message(messageService);
    this.roles = new Roles(rolesService);
    this.user = new User(this.options, userService);

    /**App config */
    new RedisProvider().validate(this.options);
    new SocketClient(options, this, redisService);
  }
}
