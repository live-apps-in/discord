import { injectable } from 'inversify';
import { IDiscordAxiosConfig } from './axios.service';
import axios, { AxiosError } from 'axios';

interface RateLimit {
  limit: number;
  remaining: number;
  resetTimestamp: number;
  resetAfter: number;
}

/**
 * Manages rate limiting for Discord API requests.
 *
 * @class DiscordRateLimiter
 */
@injectable()
export class DiscordRateLimiter {
  private rateLimits: Map<string, RateLimit> = new Map();

  async executeRequest<T>(axiosConfig: IDiscordAxiosConfig): Promise<any> {
    try {
      if (axiosConfig.endpointType) {
        /**Rate Limits */
        await this.rateLimit(axiosConfig.endpointType);
      }

      const response = await axios.request<T>(axiosConfig);

      if (axiosConfig.endpointType) {
        this.updateRateLimits(axiosConfig.endpointType, response.headers);
      }

      return response.data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response.data) {
        if (err.status === 429 && axiosConfig.endpointType) {
          this.updateRateLimits(axiosConfig.endpointType, err.response.headers);
          this.executeRequest(axiosConfig);
        }
      }

      throw {
        status: err.response?.status,
        data: err.response.data,
      };
    }
  }

  private async rateLimit(endpointType: string) {
    const limit: RateLimit = this.rateLimits.get(endpointType);

    if (limit?.remaining === 0 && limit?.resetTimestamp) {
      await this.queue(limit.resetTimestamp, limit.resetAfter * 1000);
    }

    return limit;
  }

  private updateRateLimits(endpointType: string, headers: any) {
    const limit = parseInt(headers['x-ratelimit-limit']);
    const remaining = parseInt(headers['x-ratelimit-remaining']);
    const resetTimestamp = parseInt(headers['x-ratelimit-reset']) * 1000;
    const resetAfter = parseInt(headers['x-ratelimit-reset-after']);
    const rateLimit: RateLimit = {
      limit,
      remaining,
      resetTimestamp,
      resetAfter,
    };

    this.rateLimits.set(endpointType, rateLimit);
  }

  private async queue(timestamp: number, ms: number) {
    return new Promise((resolve) => {
      const currentTimestamp = Date.now(); // Milliseconds

      if (timestamp <= currentTimestamp) {
        resolve(true);
        return;
      }

      setTimeout(() => {
        console.log('Queuing completed.');
        resolve(true);
      }, ms);
    });
  }
}
