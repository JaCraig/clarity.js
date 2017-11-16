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
interface HTMLCollection {
    map<TResult>(callback: (x: Node) => TResult): TResult[];
    filter(callback: (x: Node) => boolean): Node[];
}

/**
 * Runs a function across all items in a collection and returning the resulting array
 *
 * @template TResult
 * @param {(x: Node) => TResult} callback
 * @returns {TResult[]}
 */
HTMLCollection.prototype.map = function <TResult>(callback: (x: Node) => TResult): TResult[] {
    let ReturnValues = [];
    for (let x = 0; x < this.length; ++x) {
        ReturnValues = ReturnValues.concat(callback(this[x]));
    }
    return ReturnValues;
};

/**
 * Filters items in a collection by the function passed in and returns the resulting array
 *
 * @param {(x: Node) => boolean} callback
 * @returns {Node[]}
 */
HTMLCollection.prototype.filter = function(callback: (x: Node) => boolean): Node[]{
    let ReturnValues = [];
    for (let x = 0; x < this.length; ++x) {
        if (callback(this[x])) {
            ReturnValues = ReturnValues.concat(this[x]);
        }
    }
    return ReturnValues;
};
