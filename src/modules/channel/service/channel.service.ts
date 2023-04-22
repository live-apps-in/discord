import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/types.di';
import { ChannelAPI } from '../../../api/discord/channel';
import { AxiosService } from '../../shared/axios.service';
import { DiscordEmbeds } from '../../../shared/interface/embed.interface';

@injectable()
export class ChannelService {
  constructor(
    @inject(TYPES.ChannelAPI) private readonly channelAPI: ChannelAPI,
    @inject(TYPES.AxiosService) private readonly axiosService: AxiosService,
  ) {}

  async sendMessage(channelId: string, message: string) {
    const apiConfig = this.channelAPI.sendMessage(channelId, {
      content: message,
    });
    return this.axiosService.discordRequest(apiConfig);
  }

  async sendEmbed(channelId: string, embeds: DiscordEmbeds[]) {
    const apiConfig = this.channelAPI.sendMessage(channelId, {
      embeds,
    });
    return this.axiosService.discordRequest(apiConfig);
  }

  async replyMessage(channelId: string, messageId: string, message: string) {
    const apiConfig = this.channelAPI.replyMessage(channelId, {
      content: message,
      message_reference: {
        message_id: messageId,
      },
    });
    return this.axiosService.discordRequest(apiConfig);
  }

  async deleteMessage(channelId: string, messageId: string) {
    const apiConfig = this.channelAPI.deleteMessage(channelId, messageId);
    return this.axiosService.discordRequest(apiConfig);
  }
}
