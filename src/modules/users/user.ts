import 'reflect-metadata';
import { inject } from 'inversify';
import { TYPES } from '../../core/types.di';
import { UserService } from './service/user.service';
import { ClientOptions } from '../client/interface/client.interface';

export class User {
  constructor(
    private options: ClientOptions,
    @inject(TYPES.UserService) private readonly userService: UserService,
  ) {}
  async get() {
    return this.userService.get();
  }
}
