import { inject } from 'inversify';
import { TYPES } from '../../core/types.di';
import { MemberService } from './service/member.service';
import { options } from '../../shared/interface/options.interface';
import { RedisService } from '../shared/redis/redis.service';

/**Guild Member is referred as Member
 * userId, memberId is same
 */
export class Member {
  constructor(
    @inject(TYPES.MemberService) private readonly memberService: MemberService,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {}

  async fetch(guildId: string, memberId: string, options?: options) {
    const ignoreCache = options?.ignoreCache;

    ///Redis Cache
    if (!ignoreCache) {
      const redisCache = await this.redisService.get(
        `cache:${guildId}-${memberId}`,
      );

      if (redisCache) {
        return JSON.parse(redisCache);
      } else if (options?.onlyCache) {
        return null;
      }
    }

    const guildMember = await this.memberService.getMemberById(
      guildId,
      memberId,
    );

    await this.redisService.setWithExpiry(
      `cache:${guildId}-${memberId}`,
      JSON.stringify(guildMember),
      options?.expiry,
    );

    return guildMember;
  }
}
