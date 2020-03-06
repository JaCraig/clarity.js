/// <reference path="FunctionExtensions.d.ts" />
export declare class ErrorLogging {
    constructor();
    logError: (message: string, stack: any[]) => void;
    setLoggingFunction(logger: (message: string, stack: any[]) => void): void;
    onError(message: string, filename?: string, lineno?: number, colno?: number, error?: Error): void;
}
