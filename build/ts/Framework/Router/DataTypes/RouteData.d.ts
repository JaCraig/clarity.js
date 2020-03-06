import { StringDictionary } from '../../../Types/StringDictionary.ts';
export declare class RouteData {
    url: string;
    action: (parameters: StringDictionary<any>) => void;
    defaultValues?: StringDictionary<any>;
    constructor(url: string, action: (parameters: StringDictionary<any>) => void, defaultValues?: StringDictionary<any>);
}
