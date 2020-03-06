import { IRouter } from '../Router/Interfaces/IRouter';
export interface IRouteConfiguration {
    configureRouting(router: IRouter): void;
}
