import { User } from '../users/user';
import { UserService } from '../users/service/user.service';
import { TYPES } from '../../core/types.di';
import { GuildService } from '../guild/service/guild.service';
import { Guild } from '../guild/guild';
import container from '../../core/inversify';
import {
  Client as DiscordJSClient,
  Guild as IGuild,
  GatewayIntentBits,
} from 'discord.js';
import { EventEmitter } from 'events';
import '../shared/redis/redis.provider';
import { RedisProvider } from '../shared/redis/redis.provider';
import { RedisService } from '../shared/redis/redis.service';
import { EventsHandler } from '../events/events.handlers';
///Service
const userService = container.get<UserService>(TYPES.UserService);
const guildService = container.get<GuildService>(TYPES.GuildService);
const redisService = container.get<RedisService>(TYPES.RedisService);

export class Client extends EventEmitter {
  /**Exposed to users */
  public user: User;
  public guild: Guild;

  /**App config */
  private options: ClientOptions;
  private discordClient: DiscordJSClient;
  private redis: any;

  /**Services and internal Imports */
  // private eventsHandler: EventsHandler;

  constructor(options: ClientOptions) {
    super();
    /**Public */
    this.options = options;
    this.user = new User(this.options, userService);
    this.guild = new Guild(this.options, guildService, redisService);

    /**Module reference */
    // this.eventsHandler = container.get<EventsHandler>(TYPES.EventsHandler);

    /**App config */
    this.redis = new RedisProvider().validate(this.options);
    this.discordClient = new DiscordJSClient({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
      ],
    });
    this.discordClient.login(this.options.token);

    /**Binding DiscordJS events to our LiveApps Discord events
     * Need to set this up in a separate file
     */
    this.discordClient.on('messageCreate', (message) => {
      this.emit('messageCreate', message);
    });

    this.discordClient.on('ready', () => {
      this.emit('ready');
    });

    this.discordClient.on('guildUpdate', (undefined, newGuild: IGuild) => {
      this.guild.fetch(newGuild.id, { ignoreCache: true });
    });
  }
}

export interface ClientOptions {
  token: string;
  sync: boolean;
  logs: boolean;
  redisOptions?: IRedisOptions;
}

interface IRedisOptions {
  host: string;
  port: number;
  db: number;
  pass?: string;
}
