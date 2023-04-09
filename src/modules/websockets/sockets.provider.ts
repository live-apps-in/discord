import { WebSocket } from 'ws';
import { ClientOptions } from '../client/client';

const ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

export class WebSocketGateway {
  async connect(options: ClientOptions) {
    ws.on('open', () => {
      console.log('Connected to Discord Gateway!');
      ws.send(
        JSON.stringify({
          op: 2,
          d: {
            token: options.token,
            intents: 5,
            properties: {
              $os: 'linux',
              $browser: 'my_library',
              $device: 'my_library',
            },
          },
        }),
      );
    });

    ws.on('message', (data) => {
      const message = JSON.parse(data.toString());
      const type = message.t;
      const event = message.e;
      console.log(message, 'Data');
      console.log(type, 'T');
      console.log(event, 'E');
    });

    ws.on('error', (data) => {
      console.log(data);
    });

    //Heartbeat - Prevent discord connection close
    setInterval(() => {
      console.log('heartbeat');
      ws.send(
        JSON.stringify({
          op: 1,
          d: Date.now(),
        }),
      );
    }, 30000); //30 secs
  }
}
