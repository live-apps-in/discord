import { injectable } from 'inversify';
import { DiscordBaseAPI } from './api.discord';
import { IDiscordAxiosConfig } from '../../modules/shared/axios.service';
import { configStore } from '../../shared/store/config.store';

@injectable()
export class MessageAPI extends DiscordBaseAPI {
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

  ///Edit a message
  editMessage(channelId: string, messageId: string, body: any) {
    return {
      method: 'PATCH',
      url: `${this.DISCORD_API}/channels/${channelId}/messages/${messageId}`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      data: body,
      endpointType: `channelSendMessage:{${channelId}}`,
    } as IDiscordAxiosConfig;
  }

  ///React to a message
  messageReact(channelId: string, messageId: string, reaction: string) {
    return {
      method: 'PUT',
      url: `${this.DISCORD_API}/channels/${channelId}/messages/${messageId}/reactions/${reaction}/@me`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      data: {
        emoji: reaction,
      },
      endpointType: `channelSendMessage:{${channelId}}`,
    } as IDiscordAxiosConfig;
  }

  ///Delete a message in a channel
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
