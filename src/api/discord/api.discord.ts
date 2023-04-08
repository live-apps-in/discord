import { injectable } from 'inversify';

/** Discord v10 API Endpoints **/
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
