import { inject } from 'inversify';
import { TYPES } from '../../core/types.di';
import { GuildService } from './service/guild.service';
import { ClientOptions } from '../client/client';

export class Guild {
  private cachedGuildIds = new Set<string>();
  private cachedGuildData = new Map<string, any>();

  constructor(
    private options: ClientOptions,
    @inject(TYPES.GuildService) private readonly guildService: GuildService,
  ) {}

  async fetch(guildId: string) {
    if (this.cachedGuildIds.has(guildId)) {
      return this.cachedGuildData.get(guildId);
    }

    const guild = await this.guildService.getGuildById(guildId, this.options);

    this.cachedGuildIds.add(guildId);
    this.cachedGuildData.set(guildId, guild);

    return guild;
  }
}
