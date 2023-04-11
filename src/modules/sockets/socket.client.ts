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

    /**Ready
     * @event
     * @param {Client<true>} client - Discord Client
     */
    this.discordClient.on('ready', (client) => {
      emitter.emit('ready', client as Client<true>);
    });

    /**Raw */
    this.discordClient.on('raw', (event) => {
      emitter.emit('raw', event);
    });

    /**Messages */
    this.discordClient.on('messageCreate', (message) => {
      emitter.emit('messageCreate', message);
    });

    this.discordClient.on('messageUpdate', (oldMessage, newMessage) => {
      emitter.emit('messageUpdate', oldMessage, newMessage);
    });

    this.discordClient.on('messageDelete', (message) => {
      emitter.emit('messageDelete', message);
    });

    this.discordClient.on('messageDeleteBulk', (message, channel) => {
      emitter.emit('messageDeleteBulk', message, channel);
    });

    /**Guild */
    this.discordClient.on('guildCreate', (guild) => {
      emitter.emit('guildCreate', guild);
    });

    this.discordClient.on('guildUpdate', (oldGuild, newGuild) => {
      emitter.emit('guildUpdate', oldGuild as Guild, newGuild as Guild);
      this.eventsHandler.guildUpdate(newGuild.id); //update cache
    });

    this.discordClient.on('guildDelete', (guild) => {
      emitter.emit('guildDelete', guild);
    });

    this.discordClient.on('guildMemberAdd', (member) => {
      emitter.emit('guildMemberAdd', member);
    });

    this.discordClient.on('guildMemberRemove', (member) => {
      emitter.emit('guildMemberRemove', member);
    });

    this.discordClient.login(options.token);
  }
}
