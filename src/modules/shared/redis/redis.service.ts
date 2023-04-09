import { injectable } from 'inversify';
import { RedisProvider } from './redis.provider';

@injectable()
export class RedisService {
  /**Loading Client - Find a reusable way */
  private async client() {
    return await RedisProvider.getClient();
  }
  async set(key: string, value: string) {
    const client = await this.client();
    client.set(key, value);
  }

  async get(key: string) {
    const client = await this.client();
    return client.get(key);
  }

  async delete(key: string) {
    const client = await this.client();
    client.del(key);
  }
}
