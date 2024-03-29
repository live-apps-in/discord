import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/types.di';
import { MessageService } from './service/message.service';
import { DiscordEmbeds } from '../../shared/interface/embed.interface';
import { ICreateThread } from './interface/messages.interface';

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

  /**Create Thread from a existing message */
  async createThread(
    channelId: string,
    messageId: string,
    threadOptions: ICreateThread,
  ) {
    return this.messageService.createThread(
      channelId,
      messageId,
      threadOptions,
    );
  }

  /**Edit plain message */
  async edit(channelId: string, messageId: string, content: string) {
    return this.messageService.editMessage(channelId, messageId, content);
  }

  /**Edit Embed */
  async editEmbed(
    channelId: string,
    messageId: string,
    embeds: DiscordEmbeds[],
  ) {
    return this.messageService.editEmbed(channelId, messageId, embeds);
  }

  /**React to a message */
  async react(channelId: string, messageId: string, reaction: string) {
    return this.messageService.messageReact(channelId, messageId, reaction);
  }

  /**Remove message reaction */
  async removeReaction(channelId: string, messageId: string, reaction: string) {
    return this.messageService.messageReactionRemove(
      channelId,
      messageId,
      reaction,
    );
  }

  /**Delete message */
  async delete(channelId: string, messageId: string) {
    return this.messageService.deleteMessage(channelId, messageId);
  }
}
