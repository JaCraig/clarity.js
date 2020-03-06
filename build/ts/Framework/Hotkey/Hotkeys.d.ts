import { IHotkeys } from './Interfaces/IHotkeys.ts';
import { Scope } from './Scope.ts';
export declare class Hotkeys implements IHotkeys {
    constructor();
    private scopes;
    private currentScope;
    private latestKeys;
    private filter;
    setScope(name: string): Scope;
    addScope(name: string): Scope;
    removeScope(name: string): Hotkeys;
    clear(): Hotkeys;
    bind(keyCodes: string, callback: (event: KeyboardEvent, handler: any) => void): IHotkeys;
    unbind(keyCodes: string): Hotkeys;
    press(event: KeyboardEvent): void;
    private getKeys;
}
