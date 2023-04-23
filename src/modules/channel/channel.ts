import { inject } from 'inversify';
import { TYPES } from '../../core/types.di';
import { ChannelService } from './service/channel.service';
import { IEditChannel } from './interface/channel.interface';

export class Channel {
  constructor(
    @inject(TYPES.ChannelService)
    private readonly channelService: ChannelService,
  ) {}

  async edit(channelId: string, payload: IEditChannel) {
    return this.channelService.editChannel(channelId, payload);
  }
}
