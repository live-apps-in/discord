import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/types.di';
import { ChannelAPI } from '../../../api/discord/channel';
import { IEditChannel } from '../interface/channel.interface';
import { AxiosService } from '../../shared/axios.service';

@injectable()
export class ChannelService {
  constructor(
    @inject(TYPES.ChannelAPI) private readonly channelAPI: ChannelAPI,
    @inject(TYPES.AxiosService) private readonly axiosService: AxiosService,
  ) {}

  async editChannel(channelId: string, payload: IEditChannel) {
    const apiConfig = this.channelAPI.editChannel(channelId, payload);
    return this.axiosService.discordRequest(apiConfig);
  }
}
