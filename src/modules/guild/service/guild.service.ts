import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/types.di';
import { GuildAPI } from '../../../api/discord/guild';
import { AxiosService } from '../../shared/axios.service';

@injectable()
export class GuildService {
  constructor(
    @inject(TYPES.GuildAPI) private readonly guildAPI: GuildAPI,
    @inject(TYPES.AxiosService) private readonly axiosService: AxiosService,
  ) {}

  async getGuildById(guildId: string) {
    const apiConfig = this.guildAPI.getGuild(guildId);
    return this.axiosService.discordRequest(apiConfig);
  }

  async getAllGuild(limit: number) {
    const apiConfig = this.guildAPI.getAllGuild(limit);
    return this.axiosService.discordRequest(apiConfig);
  }
}
