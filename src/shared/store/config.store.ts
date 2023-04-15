import { v4 } from 'uuid';

export const configStore = {
  clientOptions: undefined,
  instanceId: v4().replace(/-/g, ''),
};
