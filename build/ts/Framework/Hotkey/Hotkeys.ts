/*
   Copyright 2016 James Craig

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use Hotkeys file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import { IHotkeys } from './Interfaces/IHotkeys.ts'
import { StringDictionary } from '../../Types/StringDictionary.ts'
import { Globals } from './Globals.ts'
import { Scope } from './Scope.ts'

// Defines the hotkeys system
export class Hotkeys implements IHotkeys {
    // constructor
    constructor() {
        this.scopes = { };
        this.scopes["Default"] = new Scope("Default");
        this.currentScope = this.scopes["Default"];
        this.filter = x => {
            let tagName =((<Element>x.target) || (<Element>x.srcElement)).tagName;
            return tagName !== "INPUT"
                && tagName !== "SELECT"
                && tagName !== "TEXTAREA";
        };
        this.latestKeys = [];
    }
    // The scopes within the system
    private scopes: StringDictionary<Scope>;

    // The current scope that the system uses
    private currentScope: Scope;

    // latesst key presses
    private latestKeys: number[][];

    // filter used by the system to determine if it should capture the keys pressed
    private filter: (event: KeyboardEvent) => boolean;

    // Sets the current scope, adding it if it doesn't exist and returns it.
    public setScope(name: string): Scope {
        let scope = this.addScope(name);
        this.currentScope = scope;
        return scope;
    }

    // Adds a scope to the system and returns it (or returns it if it already exists)
    public addScope(name: string): Scope {
        let tempScope = this.scopes[name];
        if (tempScope !== undefined) {
            return tempScope;
        }
        tempScope = new Scope(name);
        this.scopes[name] = tempScope;
        return tempScope;
    }

    // Removes a scope from the system
    public removeScope(name: string): Hotkeys {
        this.scopes[name] = undefined;
        if (name === "Default") {
            this.scopes["Default"] = new Scope("Default");
        }
        if (this.currentScope.name === name) {
            this.currentScope = this.scopes["Default"];
        }
        return this;
    }

    // clears all scopes and creates a new Default scope
    public clear(): Hotkeys {
        this.scopes = { };
        this.scopes["Default"] = new Scope("Default");
        this.currentScope = this.scopes["Default"];
        this.latestKeys = [];
        return this;
    }

    // adds a sequence to the current scope
    public bind(keyCodes: string, callback: (event: KeyboardEvent, handler: any) => void): IHotkeys {
        this.currentScope.addSequence(keyCodes, callback);
        return this;
    }

    // removes a sequence from the current scope
    public unbind(keyCodes: string): Hotkeys {
        this.currentScope.removeSequence(keyCodes);
        return this;
    }

    // Called when a press event is fired
    public press(event: KeyboardEvent): void {
        if (!(this.filter(event))) {
            return;
        }
        let currentKey = this.getKeys(event);
        this.latestKeys.push(currentKey);
        let tempArray = this.latestKeys.slice();
        if (this.currentScope.press(this.latestKeys, event)) {
            this.latestKeys = [];
        } else {
            while (this.latestKeys.length > 0) {
                if (this.currentScope.isPartial(this.latestKeys)) {
                    return;
                }
                this.latestKeys.shift();
            }
            if (this.latestKeys.length === 0) {
                this.currentScope.callDefault(tempArray, event);
            }
        }
    }

    // gets the string version of the keys currently pressed
    private getKeys(event: KeyboardEvent): number[] {
        let returnValue = [];
        if (event.altKey) {
            returnValue.push(Globals.keyMappings["ALT"]);
        }
        if (event.ctrlKey) {
            returnValue.push(Globals.keyMappings["CTRL"]);
        }
        if (event.metaKey) {
            returnValue.push(Globals.keyMappings["META"]);
        }
        if (event.shiftKey) {
            returnValue.push(Globals.keyMappings["SHIFT"]);
        }
        if (returnValue.indexOf(event.keyCode) === -1) {
            returnValue.push(event.keyCode);
        }
        return returnValue;
    }
}
