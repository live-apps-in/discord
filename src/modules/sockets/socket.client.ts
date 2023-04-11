import { EventEmitter } from 'events';
import { Client, GatewayIntentBits, Guild } from 'discord.js';
import { TYPES } from '../../core/types.di';
import { EventsHandler } from '../events/events.handlers';
import container from '../../core/inversify';
import { ClientOptions } from '../client/interface/client.interface';

export class SocketClient {
  private discordClient: Client;
  private eventsHandler: EventsHandler;

  constructor(options: ClientOptions, emitter: EventEmitter) {
    /**Binding Services */
    this.eventsHandler = container.get<EventsHandler>(TYPES.EventsHandler);

    /**Binding Socket Events from DiscordJS */
    this.discordClient = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
      ],
    });
    this.discordClient.on('ready', () => {
      emitter.emit('ready');
    });

    this.discordClient.on('messageCreate', (message) => {
      emitter.emit('messageCreate', message);
    });

    this.discordClient.on('guildUpdate', (oldGuild: Guild, newGuild: Guild) => {
      emitter.emit('guildUpdate', oldGuild, newGuild);
      this.eventsHandler.guildUpdate(newGuild.id);
    });

    this.discordClient.login(options.token);
  }
}
