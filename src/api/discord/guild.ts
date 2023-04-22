import { injectable } from 'inversify';
import { DiscordBaseAPI } from './api.discord';
import { IDiscordAxiosConfig } from '../../modules/shared/axios.service';
import { configStore } from '../../shared/store/config.store';

@injectable()
export class GuildAPI extends DiscordBaseAPI {
  ///Get Guild using guild Id
  getGuild(guildId: string) {
    return {
      method: 'GET',
      url: `${this.DISCORD_API}/guilds/${guildId}`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      endpointType: `getGuild:{${guildId}}`,
    } as IDiscordAxiosConfig;
  }
}
