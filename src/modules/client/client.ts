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
import { Bot } from '../bot/bot';
import { MemberService } from '../member/service/member.service';
import { Member } from '../member/member';
import { User } from '../users/user';
import { UserService } from '../users/service/user.service';
import {
  Guild as DiscordGuild,
  Message as DiscordMessage,
  GuildMember as DiscordMember,
} from 'discord.js';
import { DiscordPresence } from './interface/discord_presence';

///Service
const guildService = container.get<GuildService>(TYPES.GuildService);
const channelService = container.get<ChannelService>(TYPES.ChannelService);
const messageService = container.get<MessageService>(TYPES.MessageService);
const rolesService = container.get<RolesService>(TYPES.RolesService);
const memberService = container.get<MemberService>(TYPES.MemberService);
const redisService = container.get<RedisService>(TYPES.RedisService);
const userService = container.get<UserService>(TYPES.UserService);

/**
 * LiveApps Discord client.
 *
 * @class Client
 * @extends EventEmitter
 *
 * @param {ClientOptions} options - Discord Client config
 */
export class Client extends EventEmitter {
  /**Exposed to users */
  public guild: Guild;
  public channel: Channel;
  public member: Member;
  public message: Message;
  public roles: Roles;
  public bot: Bot;
  public user: User;

  /**App config */
  private options: ClientOptions;

  constructor(options: ClientOptions) {
    super();
    /**Public */
    this.options = options;
    configStore.clientOptions = options;
    this.guild = new Guild(guildService, redisService);
    this.channel = new Channel(channelService, redisService);
    this.member = new Member(memberService, redisService);
    this.message = new Message(messageService);
    this.roles = new Roles(rolesService);
    this.bot = new Bot();
    this.user = new User(userService, messageService, redisService);

    /**App config */
    new RedisProvider().validate(this.options);
    new SocketClient(options, this, redisService);
  }

  /**Discord Event Types */
  public on(
    event: 'guildCreate',
    listener: (guild: DiscordGuild) => void,
  ): this;
  public on(
    event: 'guildUpdate',
    listener: (guild: DiscordGuild) => void,
  ): this;
  public on(
    event: 'guildDelete',
    listener: (guild: DiscordGuild) => void,
  ): this;

  public on(
    event: 'messageCreate',
    listener: (message: DiscordMessage) => void,
  ): this;
  public on(
    event: 'messageUpdate',
    listener: (message: DiscordMessage) => void,
  ): this;
  public on(
    event: 'messageDelete',
    listener: (message: DiscordMessage) => void,
  ): this;

  public on(
    event: 'guildMemberAdd',
    listener: (member: DiscordMember) => void,
  ): this;
  public on(
    event: 'guildMemberUpdate',
    listener: (member: DiscordMember) => void,
  ): this;
  public on(
    event: 'guildMemberRemove',
    listener: (member: DiscordMember) => void,
  ): this;

  public on(
    event: 'presenceUpdate',
    listener: (event: DiscordPresence) => void,
  ): this;
  public on(event: 'ready', listener: (event: any) => void): this;
  public on(event: 'raw', listener: (event: any) => void): this;

  public on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }
}
