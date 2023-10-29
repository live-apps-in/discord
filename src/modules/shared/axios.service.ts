import axios from 'axios';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/types.di';
import { DiscordRateLimiter } from './rate_limiter';

export interface IAxiosConfig {
  method: string;
  url: string;
  params?: any;
  data?: any;
}

export interface IDiscordAxiosConfig extends IAxiosConfig {
  endpointType?: string;
}

@injectable()
export class AxiosService {
  constructor(
    @inject(TYPES.DiscordRateLimiter)
    private readonly discordRateLimiter: DiscordRateLimiter,
  ) {}

  async call(axiosConfig: IAxiosConfig) {
    let resData: any;

    await axios(axiosConfig)
      .then((res) => {
        resData = res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });

    return resData;
  }

  async discordRequest(axiosConfig: IDiscordAxiosConfig) {
    return this.discordRateLimiter.executeRequest(axiosConfig);
  }
}
