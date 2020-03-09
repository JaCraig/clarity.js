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

// Storage interface
export interface IStorage {
    // sets the value of an item for long term storage
    set(key: string, value: string): void;

    // sets the value of an item for long term storage (used when saving objects)
    setObject(key: string, value: any): void;

    // gets a value based on the key specified
    get(key: string, defaultValue: string): any;

    // Returns true if the key is present in local storage, false otherwise.
    has(key: string): boolean;

    // Removes an item from local storage
    remove(key: string): void;

    // Clears local storage of all items
    clear(): void;

    // Returns the number of items in storage
    length: number;

    // Gets the key of the item at the index specified
    key(index: number): string;

    // gets a value based on the key specified (used when saving objects)
    getObject(key: string, defaultValue: any): any;
}
