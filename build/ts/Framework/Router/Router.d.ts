import { StringDictionary } from '../../Types/StringDictionary.ts';
import { IRouter } from './Interfaces/IRouter.ts';
import { RouteData } from './DataTypes/RouteData.ts';
export declare class Router implements IRouter {
    constructor();
    private routes;
    map(route: RouteData[]): void;
    addRoute(url: string, callback: (parameters: StringDictionary<any>) => void, defaultValues?: StringDictionary<any>): Router;
    run(url: string): boolean;
}
