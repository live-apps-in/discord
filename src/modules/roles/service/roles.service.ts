import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/types.di';
import { RolesAPI } from '../../../api/discord/role.api';
import { AxiosService } from '../../shared/axios.service';

@injectable()
export class RolesService {
  constructor(
    @inject(TYPES.RolesAPI) private readonly rolesAPI: RolesAPI,
    @inject(TYPES.AxiosService) private readonly axiosService: AxiosService,
  ) {}

  /**Set Role for a member */
  async setRole(guildId: string, userId: string, roleId: string) {
    const apiConfig = this.rolesAPI.setRole(guildId, userId, roleId);

    return this.axiosService.discordRequest(apiConfig);
  }

  /**Remove role from a member */
  async removeRole(guildId: string, userId: string, roleId: string) {
    const apiConfig = this.rolesAPI.removeRole(guildId, userId, roleId);

    return this.axiosService.discordRequest(apiConfig);
  }
}
