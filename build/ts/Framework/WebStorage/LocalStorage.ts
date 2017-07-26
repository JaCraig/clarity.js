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

module Framework.WebStorage {

    // Stores data locally on the browser
    export class LocalStorage {

        // sets the value of an item for long term storage
        public static set(key: string, value: string): void {
            localStorage.setItem(key, value);
        }

        // sets the value of an item for long term storage (used when saving objects)
        public static setObject(key: string, value: any): void {
            LocalStorage.set(key, JSON.stringify(value));
        }

        // gets a value based on the key specified 
        public static get(key: string, defaultValue: string = ""): any {
            return localStorage.getItem(key) || defaultValue;
        }

        // Returns true if the key is present in local storage, false otherwise.
        public static has(key: string): boolean {
            return LocalStorage.get(key) !== undefined;
        }

        // Removes an item from local storage
        public static remove(key: string): void {
            localStorage.removeItem(key);
        }

        // Clears local storage of all items
        public static clear(): void {
            localStorage.clear();
        }

        // Returns the number of items in storage
        static get length(): number {
            return localStorage.length;
        }

        // Gets the key of the item at the index specified 
        public static key(index: number): string {
            return localStorage.key(index);
        }

        // gets a value based on the key specified (used when saving objects)
        public static getObject(key: string, defaultValue: any= null): any {
            let value = LocalStorage.get(key);
            return (value && JSON.parse(value)) || defaultValue;
        }

    }
}