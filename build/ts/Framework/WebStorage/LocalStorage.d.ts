import { IStorage } from './Interfaces/IStorage.ts';
export declare class LocalStorage implements IStorage {
    set(key: string, value: string): void;
    setObject(key: string, value: any): void;
    get(key: string, defaultValue?: string): any;
    has(key: string): boolean;
    remove(key: string): void;
    clear(): void;
    get length(): number;
    key(index: number): string;
    getObject(key: string, defaultValue?: any): any;
}
