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

import { Signature } from './Signature'

declare global {
    interface Function {
        trace(): any[];
        signature(): Signature;
        getName(): any;
    }
}

// declare var Function: FunctionConstructor;

//Does a stack trace of the function.
Function.prototype.trace = function () {
    var trace = [];
    var curr = this;
    while (curr) {
        trace.push(curr.signature());
        curr = curr.caller;
    }
    return trace;
};

//Gets the function's signature.
Function.prototype.signature = function () {
    var signature = new Signature();
    signature.name= this.getName();
    if (this.arguments) {
        for (var i = 0; i < this.arguments.length; i++) {
            signature.params.push(this.arguments[i]);
        }
    }
    return signature;
};

//Gets the function's name if it has one.
Function.prototype.getName = function () {
    if (this.name) {
        return this.name;
    }
    var definition = this.toString().split("\n")[0];
    var exp = /^function ([^\s(]+).+/;
    if (exp.test(definition)) {
        return definition.split("\n")[0].replace(exp, "$1") || "anonymous";
    }
    return "anonymous";
};

export {}