import { inject } from 'inversify';
import { TYPES } from '../../core/types.di';
import { MemberService } from './service/member.service';
import { options } from '../../shared/interface/options.interface';
import { configStore } from '../../shared/store/config.store';
import { RedisService } from '../shared/redis/redis.service';

/**Guild User is referred as Member
 * userId, memberId is same
 */
export class Member {
  private cachedMemberIds = new Set<string>();
  private cachedMemberData = new Map<string, any>();

  constructor(
    @inject(TYPES.MemberService) private readonly memberService: MemberService,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {}

  async fetch(guildId: string, memberId: string, options?: options) {
    const { clientOptions } = configStore;
    const ignoreCache = options?.ignoreCache;

    ///Redis Cache
    if (clientOptions.sync && !ignoreCache) {
      const redisCache = await this.redisService.get(
        `cache:${guildId}-${memberId}`,
      );
      if (redisCache) {
        return JSON.parse(redisCache);
      }
    }

    ///App memory cache
    if (
      !clientOptions.sync &&
      !ignoreCache &&
      this.cachedMemberIds.has(guildId)
    ) {
      return this.cachedMemberData.get(guildId);
    }

    const guild = await this.memberService.getMemberById(guildId, memberId);

    if (clientOptions.sync) {
      await this.redisService.set(`cache:${guildId}`, JSON.stringify(guild));
    } else {
      this.cachedMemberIds.add(guildId);
      this.cachedMemberData.set(guildId, guild);
    }

    return guild;
  }
}
