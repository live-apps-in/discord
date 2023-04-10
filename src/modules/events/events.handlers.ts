import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/types.di';
import { Guild } from '../guild/guild';
import container from '../../core/inversify';

@injectable()
export class EventsHandler {
  private guild: Guild;
  constructor() {
    // this.guild = container.get<Guild>(TYPES.Guild)
  }

  /**Cache Guild Changes */
  async guildUpdate(guildId: string) {
    // const guild = container.get<Guild>(TYPES.Guild);
    // await guild.fetch(guildId);
  }
}
