import { User } from '../users/user';
import { UserService } from '../users/service/user.service';
import { TYPES } from '../../core/types.di';
import { GuildService } from '../guild/service/guild.service';
import { Guild } from '../guild/guild';
import container from '../../core/inversify';
import { WebSocketGateway } from '../websockets/sockets.provider';

///Service
const userService = container.get<UserService>(TYPES.UserService);
const guildService = container.get<GuildService>(TYPES.GuildService);

export class Client {
  public user: User;
  public guild: Guild;
  private options: ClientOptions;
  private socket: any;

  constructor(options: ClientOptions) {
    this.options = options;
    this.user = new User(this.options, userService);
    this.guild = new Guild(this.options, guildService);
    this.socket = this.wsGateway(this.options);
  }

  private async wsGateway(options: ClientOptions) {
    new WebSocketGateway().connect(options);
  }
}

export interface ClientOptions {
  token: string;
  sync: ISync;
}

interface ISync {
  redisHost: string;
  redisPass?: string;
  redisDb: number;
}
