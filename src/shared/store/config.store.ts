import { v4 } from 'uuid';
import { ClientOptions } from '../../modules/client/interface/client.interface';

export const configStore = {
  clientOptions: {} as ClientOptions,
  instanceId: v4().replace(/-/g, ''),
};
