import { injectable } from 'inversify';
import { DiscordBaseAPI } from './api.discord';
import { IDiscordAxiosConfig } from '../../modules/shared/axios.service';
import { configStore } from '../../shared/store/config.store';

@injectable()
export class MemberAPI extends DiscordBaseAPI {
  ///Get Guild Member by ID
  findById(guildId: string, memberId: string) {
    return {
      method: 'GET',
      url: `${this.DISCORD_API}/guilds/${guildId}/members/${memberId}`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      endpointType: `getGuildMemberById:{${guildId}}`,
    } as IDiscordAxiosConfig;
  }
}
