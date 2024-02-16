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

import { IScope } from './Interfaces/IScope';
import { Keypress } from './Keypress';

// Sequence of key presses
export class Sequence {

    // constructor
    constructor(keyCodes: string, callback: (event: KeyboardEvent, handler: any) => void) {
        this.keyCodeSequence = keyCodes.toUpperCase();
        this.keyCodes = keyCodes.toUpperCase().split(" ").map(x => new Keypress(x));
        this.callback = callback;
        this.length = this.keyCodes.length;
        this.isDefault = "<*>" === keyCodes;
    }

    // callback to run when keys are pressed
    public callback: (event: KeyboardEvent, handler: any) => void;

    // The key code sequence
    public keyCodeSequence: string;

    // The individual key presses in this sequence
    private keyCodes: Keypress[];

    // Length of the sequence
    public length: number;
    
    // determines if this a default catch
    public isDefault: boolean;

    // calls the callback function with the data specified
    public call(keyCodes: number[][], event: KeyboardEvent, scope: IScope): boolean {
        this.callback(event, { scope: scope, keysPressed: keyCodes });
        return true;
    }

    // Runs the callback based on the keycode being pressed
    public press(keyCodes: number[][], event: KeyboardEvent, scope: IScope): boolean {
        let individualCodes = keyCodes;
        if (individualCodes.length !== this.length) {
            return false;
        }
        for (let x = 0; x < this.keyCodes.length; ++x) {
            if (!this.keyCodes[x].isPressed(individualCodes[x])) {
                return false;
            }
        }
        return this.call(keyCodes, event, scope);
    }

    // determines if this is a partial match on a sequence
    public isPartial(keyCodes: number[][]): boolean {
        let individualCodes = keyCodes;
        if (individualCodes.length > this.length) {
            return false;
        }
        for (let x = 0; x < individualCodes.length; ++x) {
            if (!this.keyCodes[x].isPressed(individualCodes[x])) {
                return false;
            }
        }
        return true;
    }
}
