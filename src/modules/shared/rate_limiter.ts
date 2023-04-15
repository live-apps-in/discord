import { injectable } from 'inversify';
import { IDiscordAxiosConfig } from './axios.service';
import axios, { AxiosError } from 'axios';

interface RateLimit {
  endpoint: string;
  limit: number;
  remaining: number;
  resetTimestamp: number;
}

@injectable()
export class DiscordRateLimiter {
  private rateLimits: Map<string, RateLimit> = new Map();
  private queue: Map<string, Array<() => void>> = new Map();

  async executeRequest<T>(axiosConfig: IDiscordAxiosConfig): Promise<any> {
    const { endpointType } = axiosConfig;

    // Acquire the rate limit lock
    await this.acquireLock(endpointType);

    try {
      const response = await axios.request<T>(axiosConfig);

      this.updateRateLimits(endpointType, response.headers);

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response);

      throw error;
    } finally {
      this.releaseLock(endpointType);
    }
  }

  private async acquireLock(endpoint: string): Promise<void> {
    const rateLimit = this.getRateLimit(endpoint);
    if (rateLimit && rateLimit.remaining === 0) {
      const waitTime = rateLimit.resetTimestamp - Date.now();
      if (waitTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
    if (rateLimit?.remaining) rateLimit.remaining--;
  }

  private releaseLock(endpoint: string): void {
    const rateLimit = this.getRateLimit(endpoint);
    if (rateLimit) {
      rateLimit.remaining++;
    }
    const endpointQueue = this.queue.get(endpoint);
    if (endpointQueue && endpointQueue.length > 0) {
      const nextRequest = endpointQueue.shift();
      nextRequest?.();
    }
  }

  private getRateLimit(endpoint: string): RateLimit | undefined {
    return this.rateLimits.get(endpoint);
  }

  public updateRateLimits(endpoint: string, headers: any): void {
    const limit = parseInt(headers['x-ratelimit-limit']);
    const remaining = parseInt(headers['x-ratelimit-remaining']);
    const resetTimestamp = parseInt(headers['x-ratelimit-reset']) * 1000;
    const rateLimit: RateLimit = { endpoint, limit, remaining, resetTimestamp };
    this.rateLimits.set(endpoint, rateLimit);
  }

  public queueRequest(endpoint: string, request: () => void): void {
    const endpointQueue = this.queue.get(endpoint);
    if (endpointQueue) {
      endpointQueue.push(request);
    } else {
      this.queue.set(endpoint, [request]);
    }
  }
}
