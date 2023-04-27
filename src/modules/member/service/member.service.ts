import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/types.di';
import { MemberAPI } from '../../../api/discord/member';
import { AxiosService } from '../../shared/axios.service';

@injectable()
export class MemberService {
  constructor(
    @inject(TYPES.MemberAPI) private readonly memberAPI: MemberAPI,
    @inject(TYPES.AxiosService) private readonly axiosService: AxiosService,
  ) {}

  async getMemberById(guildId: string, memberId: string) {
    const apiConfig = this.memberAPI.findById(guildId, memberId);
    return this.axiosService.discordRequest(apiConfig);
  }
}
