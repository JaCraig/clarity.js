import { StringDictionary } from '../../Types/StringDictionary.ts';
export declare class Route {
    constructor(url: string, callback: (parameters: StringDictionary<any>) => void, defaultValues?: StringDictionary<any>);
    private pathParts;
    private queryParts;
    private hashParts;
    private defaultValues;
    private url;
    private callbacks;
    isRoute(url: string): boolean;
    addCallback(callback: (parameters: StringDictionary<any>) => void): void;
    removeCallback(callback: (parameters: StringDictionary<any>) => void): void;
    private fixUrl;
    private getPathParts;
    private getHashParts;
    private getQueryParts;
    private getParametersFromUrl;
    private isMatch;
    run(url: string): boolean;
}
