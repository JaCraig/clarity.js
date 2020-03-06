import { StringDictionary } from '../../Types/StringDictionary.ts';
export declare class HashPart {
    constructor(part: string, defaultValues: StringDictionary<any>);
    private part;
    private variable;
    private optional;
    private defaultValue;
    isMatch(part: string): boolean;
    private getValue;
    setValue(part: string, parameters: StringDictionary<any>): void;
}
