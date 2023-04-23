import { inject } from 'inversify';
import { TYPES } from '../../core/types.di';
import { RolesService } from './service/roles.service';

export class Roles {
  constructor(
    @inject(TYPES.RolesService) private readonly rolesService: RolesService,
  ) {}

  /**Set Role */
  async set(guildId: string, userId: string, roleId: string) {
    return this.rolesService.setRole(guildId, userId, roleId);
  }

  /**Remove Role */
  async remove(guildId: string, userId: string, roleId: string) {
    return this.rolesService.removeRole(guildId, userId, roleId);
  }
}
