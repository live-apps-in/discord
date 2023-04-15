import { injectable } from 'inversify';
import { RedisProvider } from './redis.provider';
import { configStore } from '../../../shared/store/config.store';
import { ClientOptions } from '../../client/interface/client.interface';

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

  async setWithExpiry(key: string, value: string, expiresAt: number) {
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
    /**If sync is off assuming app is not scaled and allows events
     * This also prevents app from crash if Redis not configured
     */
    const { sync }: ClientOptions = configStore.clientOptions;
    if (!sync) return false;

    const client = await this.client();
    if (await client.set(eventId, 'inProgress', 'EX', 2, 'NX')) return false;

    return true;
  }
}
