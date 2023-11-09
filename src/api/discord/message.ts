import { injectable } from 'inversify';
import { DiscordBaseAPI } from './api.discord';
import { IDiscordAxiosConfig } from '../../modules/shared/axios.service';
import { configStore } from '../../shared/store/config.store';
import { ICreateThread } from '../../modules/message/interface/messages.interface';

@injectable()
export class MessageAPI extends DiscordBaseAPI {
  /** Send Message to a channel */
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

  /** Reply to a message with plain message */
  replyMessage(channelId: string, body: any) {
    return {
      method: 'POST',
      url: `${this.DISCORD_API}/channels/${channelId}/messages`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      data: body,
      endpointType: `channelReplyMessage:{${channelId}}`,
    } as IDiscordAxiosConfig;
  }

  /** Create message from thread */
  createThread(channelId: string, messageId: string, payload: ICreateThread) {
    return {
      method: 'POST',
      url: `${this.DISCORD_API}/channels/${channelId}/messages/${messageId}/threads`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      data: payload,
      endpointType: `createThread:{${channelId}}`,
    } as IDiscordAxiosConfig;
  }

  /** Edit a message */
  editMessage(channelId: string, messageId: string, body: any) {
    return {
      method: 'PATCH',
      url: `${this.DISCORD_API}/channels/${channelId}/messages/${messageId}`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      data: body,
      endpointType: `channelEditMessage:{${channelId}}`,
    } as IDiscordAxiosConfig;
  }

  /** React to a message */
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
      endpointType: `channelMessageReaction:{${channelId}}`,
    } as IDiscordAxiosConfig;
  }

  /** Remove message reaction */
  removeMessageReaction(
    channelId: string,
    messageId: string,
    reaction: string,
  ) {
    return {
      method: 'DELETE',
      url: `${this.DISCORD_API}/channels/${channelId}/messages/${messageId}/reactions/${reaction}/@me`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      data: {
        emoji: reaction,
      },
      endpointType: `channelMessageReactionRemove:{${channelId}}`,
    } as IDiscordAxiosConfig;
  }

  /** Delete a message in a channel */
  deleteMessage(channelId: string, messageId: string) {
    return {
      method: 'DELETE',
      url: `${this.DISCORD_API}/channels/${channelId}/messages/${messageId}`,
      headers: {
        Authorization: this.authorization(configStore.clientOptions.token),
        ...this.headers,
      },
      endpointType: `channelDeleteMessage:{${channelId}}`,
    } as IDiscordAxiosConfig;
  }
}
