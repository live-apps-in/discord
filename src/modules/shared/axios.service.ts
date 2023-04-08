import axios from 'axios';
import { injectable } from 'inversify';

export interface IAxiosConfig {
  method: string;
  route: string;
  body?: any;
}

@injectable()
export class AxiosService {
  async call(axiosConfig: IAxiosConfig) {
    let resData: any;
    await axios(axiosConfig)
      .then((res) => {
        resData = res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
    return resData;
  }
}
