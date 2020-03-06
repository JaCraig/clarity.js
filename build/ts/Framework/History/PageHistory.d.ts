export declare class PageHistory {
    back(delta?: number): void;
    forward(delta?: number): void;
    push(state: any, url?: string, title?: string): void;
    replace(state: any, url?: string, title?: string): void;
    get state(): any;
    get length(): number;
}
