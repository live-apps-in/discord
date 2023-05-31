import { Redis } from 'ioredis';
import { ClientOptions } from '../../client/interface/client.interface';
let client: Redis;

export class RedisProvider {
  async validate(options: ClientOptions) {
    await this.connect(options);
  }

  private async connect(options: ClientOptions) {
    const { redisOptions } = options;
    client = new Redis({
      host: redisOptions.host,
      port: redisOptions.port,
      password: redisOptions.pass,
      db: redisOptions.db,
      retryStrategy: () => {
        return null;
      },
    });

    client.on('connect', () => {
      console.log('Redis connection established.');
    });

    client.on('error', (err) => {
      console.log('Error connecting to Redis: ' + err);
    });
  }

  public static getClient() {
    return client;
  }
}
