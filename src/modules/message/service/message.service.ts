import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/types.di';
import { MessageAPI } from '../../../api/discord/message';
import { AxiosService } from '../../shared/axios.service';
import { DiscordEmbeds } from '../../../shared/interface/embed.interface';
import { ICreateThread } from '../interface/messages.interface';

@injectable()
export class MessageService {
  constructor(
    @inject(TYPES.MessageAPI) private readonly messageAPI: MessageAPI,
    @inject(TYPES.AxiosService) private readonly axiosService: AxiosService,
  ) {}

  /**Message Create */
  async sendMessage(channelId: string, message: string) {
    const apiConfig = this.messageAPI.sendMessage(channelId, {
      content: message,
    });

    return this.axiosService.discordRequest(apiConfig);
  }

  async sendEmbed(channelId: string, embeds: DiscordEmbeds[]) {
    const apiConfig = this.messageAPI.sendMessage(channelId, {
      embeds,
    });

    return this.axiosService.discordRequest(apiConfig);
  }

  async replyMessage(channelId: string, messageId: string, message: string) {
    const apiConfig = this.messageAPI.replyMessage(channelId, {
      content: message,
      message_reference: {
        message_id: messageId,
      },
    });

    return this.axiosService.discordRequest(apiConfig);
  }

  async createThread(
    channelId: string,
    messageId: string,
    payload: ICreateThread,
  ) {
    const apiConfig = this.messageAPI.createThread(
      channelId,
      messageId,
      payload,
    );

    return this.axiosService.discordRequest(apiConfig);
  }

  /**Message Patch */
  async editMessage(channelId: string, messageId: string, content: string) {
    const apiConfig = this.messageAPI.editMessage(channelId, messageId, {
      content,
    });

    return this.axiosService.discordRequest(apiConfig);
  }
  /**Embed Message Patch */
  async editEmbed(
    channelId: string,
    messageId: string,
    embeds: DiscordEmbeds[],
  ) {
    const apiConfig = this.messageAPI.editMessage(channelId, messageId, {
      embeds,
    });

    return this.axiosService.discordRequest(apiConfig);
  }

  /**REact to a message */
  async messageReact(channelId: string, messageId: string, reaction: string) {
    //Check and decode emoji if not already done
    if (reaction === decodeURIComponent(reaction)) {
      reaction = encodeURIComponent(reaction);
    }

    const apiConfig = this.messageAPI.messageReact(
      channelId,
      messageId,
      reaction,
    );

    return this.axiosService.discordRequest(apiConfig);
  }

  /**Message Delete */
  async deleteMessage(channelId: string, messageId: string) {
    const apiConfig = this.messageAPI.deleteMessage(channelId, messageId);

    return this.axiosService.discordRequest(apiConfig);
  }
}
