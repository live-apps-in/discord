import { injectable } from 'inversify';
import { DiscordBaseAPI } from './api.discord';
import { IDiscordAxiosConfig } from '../../modules/shared/axios.service';

@injectable()
export class UserAPI extends DiscordBaseAPI {
  /**Get User profile */
  profile(accessToken: string) {
    return {
      method: 'GET',
      url: `${this.DISCORD_API}/users/@me`,
      headers: {
        Authorization: this.userAuthorization(accessToken),
        ...this.headers,
      },
    } as IDiscordAxiosConfig;
  }

  /**Get User Guid;s */
  guilds(accessToken: string) {
    return {
      method: 'GET',
      url: `${this.DISCORD_API}/users/@me/guilds`,
      headers: {
        Authorization: this.userAuthorization(accessToken),
        ...this.headers,
      },
    } as IDiscordAxiosConfig;
  }
}
