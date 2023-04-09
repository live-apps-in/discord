import { User } from '../users/user';
import { UserService } from '../users/service/user.service';
import { TYPES } from '../../core/types.di';
import { GuildService } from '../guild/service/guild.service';
import { Guild } from '../guild/guild';
import container from '../../core/inversify';
import { Client as DiscordJSClient, GatewayIntentBits } from 'discord.js';
import { EventEmitter } from 'events';
import '../shared/redis/redis.provider';
import { RedisProvider } from '../shared/redis/redis.provider';
///Service
const userService = container.get<UserService>(TYPES.UserService);
const guildService = container.get<GuildService>(TYPES.GuildService);

export class Client extends EventEmitter {
  public user: User;
  public guild: Guild;
  private options: ClientOptions;
  private discordClient: DiscordJSClient;
  private redis: any;

  constructor(options: ClientOptions) {
    super();
    this.options = options;
    this.user = new User(this.options, userService);
    this.guild = new Guild(this.options, guildService);
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

    /**Binding DiscordJS events to our LiveApps Discord events
     * Need to set this up in a separate file
     */
    this.discordClient.on('messageCreate', (message) => {
      this.emit('messageCreate', message);
    });

    this.discordClient.on('ready', () => {
      this.emit('ready');
    });
  }
  public async login(token: string): Promise<void> {
    await this.discordClient.login(token);
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
