import { injectable } from 'inversify';
import client from './redis.provider';

@injectable()
export class RedisService {
  async set(key: string, value: string) {
    client.set(key, value);
  }

  async get(key: string) {
    return client.get(key);
  }

  async delete(key: string) {
    client.del(key);
  }
}
