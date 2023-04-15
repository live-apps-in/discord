import { injectable } from 'inversify';
import { DiscordBaseAPI } from './api.discord';
import { IDiscordAxiosConfig } from '../../modules/shared/axios.service';

@injectable()
export class GuildAPI extends DiscordBaseAPI {
  ///get Guild using guild Id
  getGuild(guildId: string, token: string) {
    return {
      method: 'GET',
      url: `${this.DISCORD_API}/guilds/${guildId}`,
      headers: {
        Authorization: this.authorization(token),
        ...this.headers,
      },
      endpointType: `getGuild:{${guildId}}`,
    } as IDiscordAxiosConfig;
  }
}
