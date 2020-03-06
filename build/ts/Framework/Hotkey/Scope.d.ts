export declare class Scope {
    name: string;
    constructor(name: string);
    private sequences;
    press(keyCodes: number[][], event: KeyboardEvent): boolean;
    callDefault(keyCodes: number[][], event: KeyboardEvent): boolean;
    isPartial(keyCodes: number[][]): boolean;
    addSequence(keyCodes: string, callback: (event: KeyboardEvent, handler: any) => void): Scope;
    removeSequence(keyCodes: string): Scope;
    clear(): Scope;
}
