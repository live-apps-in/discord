import 'reflect-metadata';
import { injectable } from 'inversify';

/** Discord v10 API Endpoints
 *  All the child classes are extended based on action or use type, not hierarchy.
 */
@injectable()
export abstract class DiscordBaseAPI {
  protected readonly DISCORD_API = 'https://discord.com/api/v10';
  protected headers = {
    'content-type': 'application/json',
  };
  protected readonly authorization = (token: string) => {
    return `Bot ${token}`;
  };
}
