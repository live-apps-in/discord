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
      retryStrategy: redisRetryStrategy(
        redisOptions.maxRetires || 10,
        redisOptions.retryInterval || 5000,
      ),
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

function redisRetryStrategy(maxRetries: number, interval: number) {
  let retryCount = 0;

  return () => {
    if (retryCount < maxRetries) {
      retryCount += 1;
      console.log(
        `🟡 LiveApps Discord Redis - Retry attempt ${retryCount} in ${
          interval / 1000
        } seconds...`,
      );
      return interval;
    }
    return null;
  };
}
