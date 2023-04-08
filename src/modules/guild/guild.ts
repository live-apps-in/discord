import { ClientOptions } from '@live-apps-in/discord';
import { inject } from 'inversify';
import { TYPES } from '../../core/types.di';
import { GuildService } from './service/guild.service';

export class Guild {
  constructor(
    private options: ClientOptions,
    @inject(TYPES.GuildService) private readonly guildService: GuildService,
  ) {}

  async fetch(guildId: string) {
    return this.guildService.getGuildById(guildId, this.options);
  }
}
