import { injectable } from 'inversify';
import { DiscordBaseAPI } from './api.discord';
import { IDiscordAxiosConfig } from '../../modules/shared/axios.service';
import { configStore } from '../../shared/store/config.store';
import { IEditChannel } from '../../modules/channel/interface/channel.interface';

@injectable()
export class ChannelAPI extends DiscordBaseAPI {
  ///Edit Channel
  editChannel(channelId: string, payload: IEditChannel) {
    return {
      method: 'PATCH',
      url: `${this.DISCORD_API}/channels/${channelId}`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      data: payload,
      endpointType: `editChannel:{${channelId}}`,
    } as IDiscordAxiosConfig;
  }
}
