import 'reflect-metadata';
import { inject } from 'inversify';
import { TYPES } from '../../core/types.di';
import { UserService } from './service/user.service';
import { RedisService } from '../shared/redis/redis.service';
import { MessageService } from '../message/service/message.service';

export class User {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService,
    @inject(TYPES.MessageService)
    private readonly messageService: MessageService,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {}

  async profile(accessToken: string) {
    return this.userService.profile(accessToken);
  }

  /**This method uses only Redis as of now
   * TODO - Add support for app cache!
   */
  async sendMessage(userId: string, message: string) {
    let channelId: string;

    const getUserChannel = await this.redisService.get(`userChannel:${userId}`);
    channelId = getUserChannel;

    if (!getUserChannel) {
      const channel = await this.userService.createChannel(userId);
      channelId = channel.id;

      await this.redisService.set(`userChannel:${userId}`, channel.id);
    }
    return this.messageService.sendMessage(channelId, message);
  }

  async guilds(accessToken: string) {
    return this.userService.guilds(accessToken);
  }
}
