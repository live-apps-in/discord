import { EventEmitter } from 'events';
import { Client, GatewayIntentBits, Guild } from 'discord.js';
import { TYPES } from '../../core/types.di';
import { EventsHandler } from '../events/events.handlers';
import container from '../../core/inversify';
import { ClientOptions } from '../client/interface/client.interface';
import { RedisService } from '../shared/redis/redis.service';
import { inject } from 'inversify';
export class SocketClient {
  private discordClient: Client;
  private eventsHandler: EventsHandler;

  constructor(
    options: ClientOptions,
    emitter: EventEmitter,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {
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
    this.discordClient.on('ready', async (client) => {
      emitter.emit('ready', client as Client<true>);
    });

    /**Raw */
    this.discordClient.on('raw', (event) => {
      emitter.emit('raw', event);
    });

    /**Messages */
    this.discordClient.on('messageCreate', async (message) => {
      const eventId = `discord-events:${message.id}`;
      if (await this.redisService.hasEventProcessed(eventId)) return;

      emitter.emit('messageCreate', message);
    });

    this.discordClient.on('messageUpdate', async (oldMessage, newMessage) => {
      const eventId = `discord-events:${newMessage.id}`;
      if (await this.redisService.hasEventProcessed(eventId)) return;

      emitter.emit('messageUpdate', oldMessage, newMessage);
    });

    this.discordClient.on('messageDelete', async (message) => {
      const eventId = `discord-events:${message.id}`;
      if (await this.redisService.hasEventProcessed(eventId)) return;

      emitter.emit('messageDelete', message);
    });

    /**Guild */
    this.discordClient.on('guildCreate', async (guild) => {
      const eventId = `discord-events:${guild.id}:create`;
      if (await this.redisService.hasEventProcessed(eventId)) return;

      emitter.emit('guildCreate', guild);
    });

    this.discordClient.on('guildUpdate', async (oldGuild, newGuild) => {
      const eventId = `discord-events:${newGuild.id}`;
      if (await this.redisService.hasEventProcessed(eventId)) return;

      emitter.emit('guildUpdate', oldGuild as Guild, newGuild as Guild);
      this.eventsHandler.guildUpdate(newGuild.id); //update cache
    });

    this.discordClient.on('guildDelete', async (guild) => {
      const eventId = `discord-events:${guild.id}:delete`;
      if (await this.redisService.hasEventProcessed(eventId)) return;

      emitter.emit('guildDelete', guild);
    });

    this.discordClient.on('guildMemberAdd', async (member) => {
      const eventId = `discord-events:${member.id}:${member.guild.id}`;
      if (await this.redisService.hasEventProcessed(eventId)) return;

      emitter.emit('guildMemberAdd', member);
    });

    this.discordClient.on('guildMemberRemove', async (member) => {
      const eventId = `discord-events:${member.id}:${member.guild.id}`;
      if (await this.redisService.hasEventProcessed(eventId)) return;

      emitter.emit('guildMemberRemove', member);
    });

    this.discordClient.login(options.token);
  }
}
