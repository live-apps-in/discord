import { EventEmitter } from 'events';
import { Client, GatewayIntentBits, Guild } from 'discord.js';
import { TYPES } from '../../core/types.di';
import { EventsHandler } from '../events/events.handlers';
import container from '../../core/inversify';
import { ClientOptions } from '../client/interface/client.interface';
import { RedisService } from '../shared/redis/redis.service';
import { inject } from 'inversify';
import { DiscordEvents } from '../../shared/enum/events.enum';

/**
 * Handles socket connection and events for the Discord client.
 *
 * @class SocketClient
 *
 * @param {ClientOptions} options - The client options.
 * @param {EventEmitter} emitter - The event emitter to propagate events.
 * @param {RedisService} redisService - The Redis service for event processing.
 */
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
    if (options.events.includes(DiscordEvents.raw)) {
      this.discordClient.on('raw', (event) => {
        emitter.emit('raw', event);
      });
    }

    /**Messages */
    if (options.events.includes(DiscordEvents.messageCreate)) {
      this.discordClient.on('messageCreate', async (message) => {
        const eventId = `discord-events:${message.id}`;
        if (await this.redisService.hasEventProcessed(eventId)) return;

        emitter.emit('messageCreate', message);
      });
    }

    if (options.events.includes(DiscordEvents.messageUpdate)) {
      this.discordClient.on('messageUpdate', async (oldMessage, newMessage) => {
        const eventId = `discord-events:${newMessage.id}`;
        if (await this.redisService.hasEventProcessed(eventId)) return;

        emitter.emit('messageUpdate', oldMessage, newMessage);
      });
    }

    if (options.events.includes(DiscordEvents.messageDelete)) {
      this.discordClient.on('messageDelete', async (message) => {
        const eventId = `discord-events:${message.id}`;
        if (await this.redisService.hasEventProcessed(eventId)) return;

        emitter.emit('messageDelete', message);
      });
    }

    /**Guild */
    if (options.events.includes(DiscordEvents.guildCreate)) {
      this.discordClient.on('guildCreate', async (guild) => {
        const eventId = `discord-events:${guild.id}:create`;
        if (await this.redisService.hasEventProcessed(eventId)) return;

        emitter.emit('guildCreate', guild);
      });
    }

    if (options.events.includes(DiscordEvents.guildUpdate)) {
      this.discordClient.on('guildUpdate', async (oldGuild, newGuild) => {
        const eventId = `discord-events:${newGuild.id}`;
        if (await this.redisService.hasEventProcessed(eventId)) return;

        emitter.emit('guildUpdate', oldGuild as Guild, newGuild as Guild);
        this.eventsHandler.guildUpdate(newGuild.id); //update cache
      });
    }

    if (options.events.includes(DiscordEvents.guildDelete)) {
      this.discordClient.on('guildDelete', async (guild) => {
        const eventId = `discord-events:${guild.id}:delete`;
        if (await this.redisService.hasEventProcessed(eventId)) return;

        emitter.emit('guildDelete', guild);
      });
    }

    /**Guild Member */
    if (options.events.includes(DiscordEvents.guildMemberAdd)) {
      this.discordClient.on('guildMemberAdd', async (member) => {
        const eventId = `discord-events:${member.id}:${member.guild.id}:create`;
        if (await this.redisService.hasEventProcessed(eventId)) return;

        emitter.emit('guildMemberAdd', member);
      });
    }

    if (options.events.includes(DiscordEvents.guildMemberRemove)) {
      this.discordClient.on('guildMemberRemove', async (member) => {
        const eventId = `discord-events:${member.id}:${member.guild.id}:remove`;
        if (await this.redisService.hasEventProcessed(eventId)) return;

        emitter.emit('guildMemberRemove', member);
      });
    }

    if (options.events.includes(DiscordEvents.guildMemberUpdate)) {
      this.discordClient.on('guildMemberUpdate', async (member) => {
        const eventId = `discord-events:${member.id}:${member.guild.id}:update`;
        if (await this.redisService.hasEventProcessed(eventId)) return;

        emitter.emit('guildMemberUpdate', member);
      });
    }

    this.discordClient.login(options.token);
  }
}
