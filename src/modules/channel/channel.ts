import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/types.di';
import { ChannelService } from './service/channel.service';
import { DiscordEmbeds } from '../../shared/interface/embed.interface';

@injectable()
export class Channel {
  constructor(
    @inject(TYPES.ChannelService)
    private readonly channelService: ChannelService,
  ) {}

  /**Send plain message */
  async sendMessage(channelId: string, message: string) {
    return this.channelService.sendMessage(channelId, message);
  }

  /**Send Embed Message */
  async sendEmbed(channelId: string, embed: DiscordEmbeds[]) {
    return this.channelService.sendEmbed(channelId, embed);
  }

  /**Reply to message with plain message */
  async replyMessage(channelId: string, messageId: string, message: string) {
    return this.channelService.replyMessage(channelId, messageId, message);
  }

  /**Delete message */
  async deleteMessage(channelId: string, messageId: string) {
    return this.channelService.deleteMessage(channelId, messageId);
  }
}
