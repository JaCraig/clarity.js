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

/// <reference path="../../Types/NumberDictionary.ts" />
/// <reference path="../../Types/StringDictionary.ts" />
/// <reference path="../../Browser/BrowserUtils.ts" />
/// <reference path="Globals.ts" />


module Framework.Hotkey {

    // Individual key press
    export class Keypress {

        // Constructor
        constructor(keys: string) {
            this.keys = this.getKeys(keys);
        }

        // actual key codes
        private keys: number[];

        // gets the key codes for the string passed in
        private getKeys(keyCode: string): number[] {
            return keyCode.toUpperCase().split(/-(?!$)/).map(x => Globals.keyMappings[x] || x.charCodeAt(0));
        }

        // determines if the key code is pressed
        public isPressed(keyCode: number[]): boolean {
            let keysPressed = keyCode;
            if (keysPressed.length !== this.keys.length) {
                return false;
            }
            for (let x = 0; x < keysPressed.length; ++x) {
                if (this.keys.indexOf(keysPressed[x]) === -1) {
                    return false;
                }
            }
            return true;
        }
    }
}