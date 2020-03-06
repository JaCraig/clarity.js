import { StringDictionary } from '../../Types/StringDictionary.ts';
export declare class QueryPart {
    constructor(part: string, defaultValues: StringDictionary<any>);
    private part;
    private key;
    private variable;
    private optional;
    private defaultValue;
    isMatch(part: string): boolean;
    private getValue;
    setValue(part: string, parameters: StringDictionary<any>): void;
}
