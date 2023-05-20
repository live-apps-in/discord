import 'reflect-metadata';
import { inject } from 'inversify';
import { TYPES } from '../../core/types.di';
import { UserService } from './service/user.service';

export class User {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService,
  ) {}

  async profile(accessToken: string) {
    return this.userService.profile(accessToken);
  }

  async guilds(accessToken: string) {
    return this.userService.guilds(accessToken);
  }
}
