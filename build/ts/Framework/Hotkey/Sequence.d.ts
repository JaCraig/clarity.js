import { Scope } from './Scope.ts';
export declare class Sequence {
    constructor(keyCodes: string, callback: (event: KeyboardEvent, handler: any) => void);
    callback: (event: KeyboardEvent, handler: any) => void;
    keyCodeSequence: string;
    private keyCodes;
    length: number;
    isDefault: boolean;
    call(keyCodes: number[][], event: KeyboardEvent, scope: Scope): boolean;
    press(keyCodes: number[][], event: KeyboardEvent, scope: Scope): boolean;
    isPartial(keyCodes: number[][]): boolean;
}
