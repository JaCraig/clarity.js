/*
   Copyright 2016 James Craig

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

/// <reference path="FunctionExtensions.ts" />

//Handles error logging
export class ErrorLogging {
    //constructor
    constructor() {
        this.logError = (ex,stack) => { };
    }

    //Logs the error message. Includes the message and stack trace information.
    public logError: (message: string, stack: any[]) => void;

    //Sets the logging function that the system uses
    public setLoggingFunction(logger: (message: string, stack: any[]) => void): void {
        this.logError = logger;
    }

    //called when an error is thrown.
    public onError(message: string, filename?: string, lineno?: number, colno?: number, error?:Error): void { 
        this.logError(message, arguments.callee.trace());
    }
}
