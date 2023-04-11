import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/types.di';
import { GuildService } from './service/guild.service';
import { RedisService } from '../shared/redis/redis.service';
import { options } from '../../shared/interface/options.interface';
import { configStore } from '../../shared/store/config.store';
import { ClientOptions } from '../client/interface/client.interface';

@injectable()
export class Guild {
  private cachedGuildIds = new Set<string>();
  private cachedGuildData = new Map<string, any>();
  private options: ClientOptions = configStore.clientOptions;
  constructor(
    @inject(TYPES.GuildService) private readonly guildService: GuildService,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {}

  async fetch(guildId: string, options?: options) {
    const ignoreCache = options?.ignoreCache;

    ///Redis Cache
    if (this.options.sync && !ignoreCache) {
      const redisCache = await this.redisService.get(`cache:${guildId}`);
      if (redisCache) {
        console.log('redis cache');
        return JSON.parse(redisCache);
      }
    }

    ///App memory cache
    if (
      !this.options.sync &&
      !ignoreCache &&
      this.cachedGuildIds.has(guildId)
    ) {
      console.log('App cache');
      return this.cachedGuildData.get(guildId);
    }

    const guild = await this.guildService.getGuildById(guildId, this.options);

    if (this.options.sync) {
      await this.redisService.set(`cache:${guildId}`, JSON.stringify(guild));
    } else {
      this.cachedGuildIds.add(guildId);
      this.cachedGuildData.set(guildId, guild);
    }

    console.log('API fetch');
    return guild;
  }
}
