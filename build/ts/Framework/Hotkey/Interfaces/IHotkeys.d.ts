export interface IHotkeys {
    bind(keyCodes: string, callback: (event: KeyboardEvent, handler: any) => void): IHotkeys;
}
