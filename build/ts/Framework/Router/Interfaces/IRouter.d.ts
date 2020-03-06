import { RouteData } from '../DataTypes/RouteData.ts';
export interface IRouter {
    map(route: RouteData[]): void;
}
