import 'reflect-metadata';
import { ClientOptions } from '@live-apps-in/discord';
import { User } from '../users/user';
import { UserService } from '../users/service/user.service';
import { TYPES } from '../../core/types.di';
import container from '../../core/inversify';

///Service
const userService = container.get<UserService>(TYPES.UserService);

export class Client {
  public user: User;
  private options: ClientOptions;

  constructor(options: ClientOptions) {
    this.options = options;
    this.user = new User(this.options, userService);
  }
}
