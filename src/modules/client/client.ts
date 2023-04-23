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

///Service
const userService = container.get<UserService>(TYPES.UserService);
const guildService = container.get<GuildService>(TYPES.GuildService);
const channelService = container.get<MessageService>(TYPES.MessageService);
const rolesService = container.get<RolesService>(TYPES.RolesService);
const redisService = container.get<RedisService>(TYPES.RedisService);

export class Client extends EventEmitter {
  /**Exposed to users */
  public user: User;
  public guild: Guild;
  public message: Message;
  public roles: Roles;

  /**App config */
  private options: ClientOptions;

  constructor(options: ClientOptions) {
    super();
    /**Public */
    this.options = options;
    configStore.clientOptions = options;
    this.user = new User(this.options, userService);
    this.guild = new Guild(guildService, redisService);
    this.message = new Message(channelService);
    this.roles = new Roles(rolesService);

    /**App config */
    new RedisProvider().validate(this.options);
    new SocketClient(options, this, redisService);
  }
}
