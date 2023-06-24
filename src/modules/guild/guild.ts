import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/types.di';
import { GuildService } from './service/guild.service';
import { RedisService } from '../shared/redis/redis.service';
import { options } from '../../shared/interface/options.interface';

@injectable()
export class Guild {
  constructor(
    @inject(TYPES.GuildService) private readonly guildService: GuildService,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {}

  async fetch(guildId: string, options?: options) {
    const ignoreCache = options?.ignoreCache;

    ///Redis Cache
    if (!ignoreCache) {
      const redisCache = await this.redisService.get(`cache:${guildId}`);

      if (redisCache) {
        return JSON.parse(redisCache);
      }
    }

    const guild = await this.guildService.getGuildById(guildId);
    if (guild.err) return guild;

    await this.redisService.setWithExpiry(
      `cache:${guildId}`,
      JSON.stringify(guild),
      options?.expiry,
    );

    return guild;
  }

  /**Fetch all Guilds */
  async fetchAll(limit?: number) {
    return this.guildService.getAllGuild(limit || 100);
  }
}
