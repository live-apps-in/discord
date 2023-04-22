import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/types.di';
import { ChannelService } from './service/channel.service';

@injectable()
export class Channel {
  constructor(
    @inject(TYPES.ChannelService)
    private readonly channelService: ChannelService,
  ) {}

  async sendMessage(channelId: string, message: string) {
    return this.channelService.sendMessage(channelId, message);
  }

  async replyMessage(channelId: string, messageId: string, message: string) {
    return this.channelService.replyMessage(channelId, messageId, message);
  }
}
