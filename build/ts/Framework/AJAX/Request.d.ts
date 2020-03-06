import { IStorage } from '../WebStorage/Interfaces/IStorage.ts';
export declare class Request {
    constructor(method: string, url: string, data?: any);
    private parser;
    private serializer;
    private url;
    private method;
    private success;
    private data;
    private error;
    private exception;
    private headers;
    private user;
    private password;
    private cacheKey;
    private cacheStorage;
    static get(url: string, data?: any): Request;
    static makeRequest(method: string, url: string, data?: any): Request;
    static post(url: string, data?: any): Request;
    static put(url: string, data?: any): Request;
    static delete(url: string, data?: any): Request;
    onSuccess(callback: (ev: any) => any): Request;
    onError(callback: (ev: any) => any): Request;
    onException(callback: (exc: any) => any): Request;
    set(key: string, value: string): Request;
    type(value: string): Request;
    accept(value: string): Request;
    setParser(parser: (content: string) => any): Request;
    useCache(cacheKey: string): Request;
    setSerializer(serializer: (data: any) => string): Request;
    setCache(cache: IStorage): Request;
    setCredentials(user: string, password: string): Request;
    send(): void;
}
