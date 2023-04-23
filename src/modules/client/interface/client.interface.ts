import { DiscordEvents } from '../../../shared/enum/events.enum';

export interface ClientOptions {
  token: string;
  sync: boolean;
  events: DiscordEvents[];
  logs?: boolean;
  redisOptions?: IRedisOptions;
}

interface IRedisOptions {
  host: string;
  port: number;
  db: number;
  pass?: string;
}
