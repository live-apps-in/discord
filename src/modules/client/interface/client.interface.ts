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
