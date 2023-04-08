import 'reflect-metadata';
import { Container } from 'inversify';
import { AxiosService } from '../modules/shared/axios.service';
import { TYPES } from './types.di';
import { UserService } from '../modules/users/service/user.service';

const container = new Container();

//**App Service */
container.bind<UserService>(TYPES.UserService).to(UserService);

//**Shared Service */
container.bind<AxiosService>(TYPES.AxiosService).to(AxiosService);

export default container;
