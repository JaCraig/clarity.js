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

/// <reference path="Sequence.ts" />


module Framework.Hotkey {

    //Defines the scope for a series of sequences
    export class Scope {

        //constructor
        constructor(public name: string) {
        }

        //The sequences available in this scope
        private sequences: Sequence[] = [];

        //determines if anything in this scope was pressed
        public press(keyCodes: number[][], event: KeyboardEvent): boolean {
            this.sequences = this.sequences.sort((x, y) => x.length > y.length ? 1 : -1);
            for (let x = 0; x < this.sequences.length; ++x) {
                if(this.sequences[x].press(keyCodes, event, this)) {
                    return true;
                }
            }
            return false;
        }

        //calls the default handler if one exists
        public callDefault(keyCodes: number[][], event: KeyboardEvent): boolean {
            let defaultItems = this.sequences.filter(x => x.isDefault);
            if (defaultItems.length === 0) {
                return false;
            }
            return defaultItems[0].call(keyCodes, event, this);
        }

        //determines if the sequence is a partial match
        public isPartial(keyCodes: number[][]): boolean {
            for (let x = 0; x < this.sequences.length; ++x) {
                if(this.sequences[x].isPartial(keyCodes)) {
                    return true;
                }
            }
            return false;
        }

        //adds an individual sequence to the scope
        public addSequence(keyCodes: string, callback: (event: KeyboardEvent, handler: any) => void): Scope {
            this.removeSequence(keyCodes);
            this.sequences.push(new Sequence(keyCodes, callback));
            return this;
        }

        //removes an individual sequence from the scope
        public removeSequence(keyCodes: string): Scope {
            this.sequences = this.sequences.filter(x => x.keyCodeSequence !== keyCodes.toUpperCase());
            return this;
        }

        //clears the sequences and scopes from the scope
        public clear(): Scope {
            this.sequences = [];
            return this;
        }
    }
}