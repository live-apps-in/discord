import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/types.di';
import { Guild } from '../guild/guild';

@injectable()
export class EventsHandler {
  constructor(@inject(TYPES.Guild) private readonly guild: Guild) {}

  /**Cache Guild Changes */
  async guildUpdate(guildId: string) {
    await this.guild.fetch(guildId, { ignoreCache: true });
  }
}
