import { injectable } from 'inversify';
import { DiscordBaseAPI } from './api.discord';
import { IDiscordAxiosConfig } from '../../modules/shared/axios.service';
import { configStore } from '../../shared/store/config.store';

@injectable()
export class ChannelAPI extends DiscordBaseAPI {
  ///Send Message to a channel
  sendMessage(channelId: string, body: any) {
    return {
      method: 'POST',
      url: `${this.DISCORD_API}/channels/${channelId}/messages`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      data: body,
      endpointType: `channelSendMessage:{${channelId}}`,
    } as IDiscordAxiosConfig;
  }

  ///Reply to a message with plain message
  replyMessage(channelId: string, body: any) {
    return {
      method: 'POST',
      url: `${this.DISCORD_API}/channels/${channelId}/messages`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      data: body,
      endpointType: `channelSendMessage:{${channelId}}`,
    } as IDiscordAxiosConfig;
  }

  ///Reply to a message with plain message
  deleteMessage(channelId: string, messageId: string) {
    return {
      method: 'DELETE',
      url: `${this.DISCORD_API}/channels/${channelId}/messages/${messageId}`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      endpointType: `channelSendMessage:{${channelId}}`,
    } as IDiscordAxiosConfig;
  }
}
