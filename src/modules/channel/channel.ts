import { inject } from 'inversify';
import { TYPES } from '../../core/types.di';
import { ChannelService } from './service/channel.service';
import { IEditChannel } from './interface/channel.interface';
import { options } from '../../shared/interface/options.interface';
import { RedisService } from '../shared/redis/redis.service';

export class Channel {
  constructor(
    @inject(TYPES.ChannelService)
    private readonly channelService: ChannelService,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {}

  async fetch(channelId: string, options?: options) {
    const ignoreCache = options?.ignoreCache;

    ///Redis Cache
    if (!ignoreCache) {
      const redisCache = await this.redisService.get(`cache:${channelId}`);

      if (redisCache) {
        return JSON.parse(redisCache);
      }
    }

    const channel = await this.channelService.fetch(channelId);

    await this.redisService.setWithExpiry(
      `cache:${channelId}`,
      JSON.stringify(channel),
      options.expiry,
    );

    return channel;
  }

  async edit(channelId: string, payload: IEditChannel) {
    return this.channelService.editChannel(channelId, payload);
  }
}
