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
    otherSetting?: any;
    someOther?: any;
  }

  export class Client {
    constructor(options: ClientOptions);
    getUsers(): Promise<User[]>;
    getServer(): Promise<Server[]>;
  }
}
