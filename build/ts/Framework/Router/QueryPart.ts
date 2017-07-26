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

/// <reference path="../../Types/StringDictionary.ts" />


module Framework.Router {

    // An individual query string part
    export class QueryPart {

        // Constructor
        constructor(part: string, defaultValues: Types.StringDictionary<any>) {
            let tempParts = part.split("=", 2);
            this.key = tempParts[0];
            part = tempParts[1];
            this.variable = part.charAt(0) === "{" && part.charAt(part.length - 1) === "}";
            part = part.replace(/[{}]/g, "");
            this.optional = part.charAt(0) === "^";
            this.part = part.replace(/[\^]/g, "");
            if (defaultValues[this.part] !== undefined) {
                this.defaultValue = defaultValues[this.part];
            } else {
                this.defaultValue = "";
            }
        }

        // The actual part of the path to match on
        private part: string;

        // The key portion of the query string part
        private key: string;

        // Is this a variable?
        private variable: boolean;

        // Is this optional?
        private optional: boolean;

        // The default value for this part
        private defaultValue: any;

        // Determines if this is a match.
        public isMatch(part: string): boolean {
            if (part === undefined || part === null) {
                return false;
            }
            let tempParts = part.split("=", 2);
            if (tempParts.length !== 2) {
                return false;
            }
            if (this.key.toUpperCase() !== tempParts[0].toUpperCase()) {
                return false;
            }
            part = tempParts[1];
            if (part === undefined) {
                return this.optional;
            }
            if (this.variable) {
                return this.optional || part !== "";
            }
            return this.optional || part.toUpperCase() === this.part.toUpperCase();
        }

        // Gets the value, if it is a variable. If it is not a variable, it returns undefined and if it is a variable but no
        // value is present it returns null. 
        private getValue(part: string): string {
            if (part === undefined || part === null) {
                return this.defaultValue;
            }
            let tempParts = part.split("=", 2);
            if (tempParts.length !== 2) {
                return this.defaultValue;
            }
            part = tempParts[1];
            if (!this.variable) {
                return part || this.defaultValue;
            }
            if (part !== undefined) {
                return part || this.defaultValue;
            } else {
                return this.defaultValue;
            }
        }

        // Sets the value used for the path part
        public setValue(part: string, parameters: Types.StringDictionary<any>): void {
            let tempValue = this.getValue(part);
            parameters[this.key] = this.getValue(part);
        }
    }
}