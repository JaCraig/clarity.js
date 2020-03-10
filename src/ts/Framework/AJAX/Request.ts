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

import { StringDictionary } from '../../Types/StringDictionary'
import { LocalStorage } from '../WebStorage/LocalStorage'
import { IStorage } from '../WebStorage/Interfaces/IStorage'

// Class to help make AJAX requests
export class Request {
    // Constructor
    constructor(method: string, url: string, data?: any) {
        this.url = url;
        this.method = method.toUpperCase();
        this.data = data;
        this.headers = { };
        if (this.method !== "GET"
            && this.method !== "HEAD"
            && this.method !== "DELETE"
            && this.method !== "TRACE") {
            this.headers["Content-Type"] = "application/json";
        }
        this.headers["Accept"] = "application/json";
        this.parser = x => JSON.parse(x);
        this.serializer = x => JSON.stringify(x);
        this.cacheStorage = new LocalStorage();
    }

    // The parser that the application uses
    private parser: (content: string) => any;

    // The serializer that the application uses
    private serializer: (data: any) => string;

    // URL to call
    private url: string;

    // Method to use when calling
    private method: string;

    // Success callback
    private success: (ev: any) => any;

    // Data to send in the request
    private data: any;

    // Error callback
    private error: (ev: any) => any;

    // Exception callback
    private exception: (exc: any) => any;

    // Any headers to add to the call
    private headers: StringDictionary<string>;

    // User name to use
    private user: string;

    // Password to use
    private password: string;

    // Cache the results
    private cacheKey: string;

    // The cache storage to use.
    private cacheStorage: IStorage;

    // GET method.
    public static get(url: string, data?: any): Request {
        return new Request("GET", url, data);
    }

    // A request using a HTTP verb that is not GET, POST, PUT, or DELETE
    public static makeRequest(method: string, url: string, data?: any): Request {
        return new Request(method, url, data);
    }

    // POST method.
    public static post(url: string, data?: any): Request {
        return new Request("POST", url, data);
    }

    // PUT method.
    public static put(url: string, data?: any): Request {
        return new Request("PUT", url, data);
    }

    // DELETE method.
    public static delete(url: string, data?: any): Request {
        return new Request("DELETE", url, data);
    }

    // Adds a callback to call if the AJAX request succeeds.
    public onSuccess(callback: (ev: any) => any): Request {
        this.success = callback;
        return this;
    }

    // Adds a callback to call if the AJAX request fails.
    public onError(callback: (ev: any) => any): Request {
        this.error = callback;
        return this;
    }

    // Adds a callback if the AJAX request has an exception after receiving the response.
    public onException(callback: (exc: any) => any): Request {
        this.exception = callback;
        return this;
    }

    // Adds a header value to the AJAX request.
    public set(key: string, value: string): Request {
        this.headers[key] = value;
        return this;
    }

    // Short hand for setting the content type header value
    public type(value: string): Request {
        return this.set("Content-Type", value);
    }

    // Short hand for setting the accepts header value
    public accept(value: string): Request {
        return this.set("Accept", value);
    }

    // Sets the parser that the request uses
    public setParser(parser: (content: string) => any): Request {
        this.parser = parser;
        return this;
    }

    // Ensures that the result of the request will be cached and used in future requests.
    public useCache(cacheKey: string): Request {
        this.cacheKey = cacheKey;
        return this;
    }

    // Sets the serializer that the request uses
    public setSerializer(serializer: (data: any) => string): Request {
        this.serializer = serializer;
        return this;
    }

    // Sets the cache to use for the request
    public setCache(cache: IStorage): Request {
        this.cacheStorage = cache;
        return this;
    }

    // Sets the user name/password to use when connecting to the server
    public setCredentials(user: string, password: string): Request {
        this.user = user;
        this.password = password;
        return this;
    }

    // Actually sends the request, parses it, and calls either the
    // success or error functions if they exist.
    public send(): void {
        if (this.error === undefined || this.error === null) {
            this.error = x => { };
        }
        if (this.success === undefined || this.success === null) {
            this.success = x => { };
        }
        if (this.exception === undefined || this.exception === null) {
            this.exception = x => { throw x; };
        }
        if (this.cacheStorage === undefined || this.cacheStorage === null) {
            this.cacheStorage = new LocalStorage();
        }
        if (this.cacheKey !== null && this.cacheKey !== undefined && this.cacheStorage.has(this.cacheKey)) {
            this.success(this.parser(this.cacheStorage.get(this.cacheKey, "")));
            return;
        }
        let request = new XMLHttpRequest();
        request.open(this.method, encodeURI(this.url), true, this.user, this.password);
        for (let property in this.headers) {
            if (this.headers.hasOwnProperty(property)) {
                request.setRequestHeader(property, this.headers[property]);
            }
        }
        request.addEventListener("load", x => {
            try {
                if (request.status === 200) {
                    if (this.cacheKey !== null && this.cacheKey !== undefined) {
                        this.cacheStorage.set(this.cacheKey, request.responseText);
                    }
                    return this.success(this.parser(request.responseText));
                }
                return this.error(this.parser(request.responseText));
            } catch (exception) {
                return this.exception(exception);
            }
        });
        request.addEventListener("error", x => {
            try {
                return this.error(this.parser(request.responseText));
            } catch (exception) {
                return this.exception(exception);
            }
        });
        if (this.data !== undefined) {
            request.send(this.serializer(this.data));
        } else {
            request.send();
        }
    }
}
