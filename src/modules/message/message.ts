import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/types.di';
import { MessageService } from './service/channel.service';
import { DiscordEmbeds } from '../../shared/interface/embed.interface';

@injectable()
export class Message {
  constructor(
    @inject(TYPES.MessageService)
    private readonly messageService: MessageService,
  ) {}

  /**Send plain message */
  async send(channelId: string, message: string) {
    return this.messageService.sendMessage(channelId, message);
  }

  /**Send Embed Message */
  async sendEmbed(channelId: string, embeds: DiscordEmbeds[]) {
    return this.messageService.sendEmbed(channelId, embeds);
  }

  /**Reply to message with plain message */
  async reply(channelId: string, messageId: string, message: string) {
    return this.messageService.replyMessage(channelId, messageId, message);
  }

  /**Edit Embed */
  async editEmbed(
    channelId: string,
    messageId: string,
    embeds: DiscordEmbeds[],
  ) {
    return this.messageService.editEmbed(channelId, messageId, embeds);
  }

  /**Delete message */
  async delete(channelId: string, messageId: string) {
    return this.messageService.deleteMessage(channelId, messageId);
  }
}
