import { Client } from 'discord.js';
import { configStore } from '../../shared/store/config.store';

export class Bot {
  private client: Client;

  constructor() {
    this.client = new Client({
      intents: [],
    });

    this.client.login(configStore.clientOptions.token);
  }

  async setActivity(name: string, activityType: any) {
    if (!this.client.user) {
      // The client user is not available yet, waiting for the 'ready' event to be emitted
      await new Promise((resolve) => this.client.once('ready', resolve));
    }

    this.client.user?.setActivity(name, { type: activityType });
  }
}
