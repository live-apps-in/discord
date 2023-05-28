import { injectable } from 'inversify';
import { DiscordBaseAPI } from './api.discord';
import { IDiscordAxiosConfig } from '../../modules/shared/axios.service';
import { configStore } from '../../shared/store/config.store';

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

  /**Send Message to a user */
  createChannel(recipient_id: string) {
    return {
      method: 'POST',
      url: `${this.DISCORD_API}/users/@me/channels`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      data: { recipient_id },
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
