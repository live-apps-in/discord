import { injectable } from 'inversify';
import { RedisProvider } from './redis.provider';

@injectable()
export class RedisService {
  /**Loading Redis client */
  private async client() {
    return await RedisProvider.getClient();
  }
  async set(key: string, value: string) {
    const client = await this.client();
    client.set(key, value);
  }

  async setWithExpiry(key: string, value: string, expiresAt = 86400) {
    const client = await this.client();
    client.set(key, value, 'EX', expiresAt);
  }

  async get(key: string) {
    const client = await this.client();

    return client.get(key);
  }

  async exists(key: string) {
    const client = await this.client();

    return client.exists(key);
  }

  async delete(key: string) {
    const client = await this.client();
    client.del(key);
  }

  /**De-duplication
   * Lock Mechanism
   */
  async hasEventProcessed(eventId: string): Promise<boolean> {
    /**
     * We are dependent on Redis to check if the event has been acquired by another instance.
     * This feature will be deprecated after finding a solution to load balance Discord events
     */
    const client = await this.client();
    if (await client.set(eventId, 'inProgress', 'EX', 2, 'NX')) return false;

    return true;
  }
}
