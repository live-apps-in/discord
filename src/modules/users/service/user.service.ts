import { injectable } from 'inversify';

@injectable()
export class UserService {
  async get() {
    return { name: 'Adam' };
  }
}
