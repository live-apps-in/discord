import { injectable } from 'inversify';
import { DiscordBaseAPI } from './api.discord';
import { configStore } from '../../shared/store/config.store';
import { IDiscordAxiosConfig } from '../../modules/shared/axios.service';

@injectable()
export class RolesAPI extends DiscordBaseAPI {
  /**Set Role for a user */
  setRole(guildId: string, userId: string, roleId: string) {
    return {
      method: 'PUT',
      url: `${this.DISCORD_API}/guilds/${guildId}/members/${userId}/roles/${roleId}`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      endpointType: `guildSetRole:{${guildId}}`,
    } as IDiscordAxiosConfig;
  }

  /**Remove role from a user */
  removeRole(guildId: string, userId: string, roleId: string) {
    return {
      method: 'DELETE',
      url: `${this.DISCORD_API}/guilds/${guildId}/members/${userId}/roles/${roleId}`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      endpointType: `guildRemoveRole:{${guildId}}`,
    } as IDiscordAxiosConfig;
  }
}
