import { Presence } from 'discord.js';

export interface DiscordPresence {
  oldPresence: Presence;
  newPresence: Presence;
}
