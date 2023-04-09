import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/types.di';
import { GuildAPI } from '../../../api/discord/guild';
import { AxiosService } from '../../shared/axios.service';
import { ClientOptions } from '../../client/client';

@injectable()
export class GuildService {
  constructor(
    @inject(TYPES.GuildAPI) private readonly guildAPI: GuildAPI,
    @inject(TYPES.AxiosService) private readonly axiosService: AxiosService,
  ) {}

  async getGuildById(guildId: string, options: ClientOptions) {
    const apiConfig = this.guildAPI.getGuild(guildId, options.token);
    return this.axiosService.call(apiConfig);
  }
}
