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

// Database connection class
export class DatabaseConnection {
    // constructor
    constructor(dbName: string, tables: string[], version: number) {
        this.DBName = dbName;
        this.Version = version;
        let request = indexedDB.open(dbName, version);
        request.onupgradeneeded = (ev: any) => {
            this.database = ev.target.result;
            for(let x = 0; x < tables.length; ++x) {
                let table = tables[x];
                if (this.database.objectStoreNames.contains(table)) {
                    this.database.deleteObjectStore(table);
                }
                this.database.createObjectStore(table);
            }
        };
        request.onsuccess = (ev: any) => {
            this.database = ev.target.result;
        };
    }

    // Database name
    private DBName: string;

    // database version
    private Version: number;

    // open the database table
    public openDatabase(onsuccess:(connection: DatabaseConnection) => any): void {
        let request = indexedDB.open(this.DBName, this.Version);
        request.onsuccess = (ev: any) => {
            this.database = ev.target.result;
            return onsuccess(this);
        };
    }

    public add(table: string, obj: any, key: IDBValidKey): void {
        let req = this.database.transaction(table, "readwrite").objectStore(table).put(obj, key);
    }

    public remove(table: string, key: IDBValidKey): void {
        let req = this.database.transaction(table, "readwrite").objectStore(table).delete(key);
    }

    public getByKey(table: string, key: IDBValidKey, onSuccess: (ev: Event)=> any): void {
        let req = this.database.transaction(table, "readwrite").objectStore(table).get(key);
        req.onsuccess = onSuccess;
    }

    public getKeys(table: string, onSuccess: (ev: Event)=> any): void {
        let req = this.database.transaction(table, "readwrite").objectStore(table).getAllKeys();
        req.onsuccess = onSuccess;
    }

    public get(table: string, query: string, onSuccess: (ev: Event)=> any): void {
        let req = this.database.transaction(table, "readwrite").objectStore(table).get(query);
        req.onsuccess = onSuccess;
    }

    public getAll(table: string, onSuccess: (ev: Event)=> any, query?: string): void {
        let req = this.database.transaction(table, "readwrite").objectStore(table).getAll(query);
        req.onsuccess = onSuccess;
    }

    // Database pointer
    private database: IDBDatabase;
}