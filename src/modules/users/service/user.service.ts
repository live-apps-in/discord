import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/types.di';
import { UserAPI } from '../../../api/discord/user';
import { AxiosService } from '../../shared/axios.service';

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserAPI) private readonly userAPI: UserAPI,
    @inject(TYPES.AxiosService) private readonly axiosService: AxiosService,
  ) {}

  async profile(accessToken: string) {
    const apiConfig = this.userAPI.profile(accessToken);

    return this.axiosService.discordRequest(apiConfig);
  }

  async createChannel(recipient_id: string) {
    const apiConfig = this.userAPI.createChannel(recipient_id);

    return this.axiosService.discordRequest(apiConfig);
  }

  async guilds(accessToken: string) {
    const apiConfig = this.userAPI.guilds(accessToken);

    return this.axiosService.discordRequest(apiConfig);
  }
}
