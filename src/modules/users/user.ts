import 'reflect-metadata';
import { ClientOptions } from '@live-apps-in/discord';
import { inject } from 'inversify';
import { TYPES } from '../../core/types.di';
import { UserService } from './service/user.service';

export class User {
  constructor(
    private options: ClientOptions,
    @inject(TYPES.UserService) private readonly userService: UserService,
  ) {}
  async get() {
    return this.userService.get();
  }
}
