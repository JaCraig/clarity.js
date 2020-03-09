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

//Holds signature information
export class Signature {
    
    //Constructor
    constructor() {
        this.params=[];
    }

    //Function name
    public name: string;

    //Function parameters
    public params: any[];

    //Converts the class to a string
    public toString(): string {
        let params = this.params.length > 0
            ? "'" + this.params.join("', '") + "'"
            : "";
        return this.name + "(" + params + ")";
    }
}    
