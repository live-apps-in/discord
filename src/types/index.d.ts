declare module '@live-apps-in/discord' {
  interface User {
    id: string;
    username: string;
  }

  interface Server {
    id: string;
    name: string;
  }

  interface ClientOptions {
    token: string;
  }

  export class Client {
    constructor(options: ClientOptions);
    getUsers(): Promise<User[]>;
    getServer(): Promise<Server[]>;
  }
}
