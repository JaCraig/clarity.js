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
import Vue from 'vue';

let clickOutside: any = {
    bind: function(el: any) {
        clickOutside.onEventBound = clickOutside.onEvent.bind({ el });
        document.addEventListener("click", clickOutside.onEventBound);
    },
    cb: function(event: any) {
        return;
    },
    onEvent: function(event: { target: any; }) {
        if (event.target === this.el || this.el.contains(event.target) || clickOutside.cb) {
            clickOutside.cb(event);
        }
    },
    onEventBound: function() {
        return;
    },
    unbind: function () {
        document.removeEventListener("click", clickOutside.onEventBound);
    },
    update: function(el: any, binding: { value: (event: any) => void; }) {
        if (typeof binding.value !== "function") {
            throw new Error("Argument must be a function");
        }
        clickOutside.cb = binding.value;
    },
};

export function RegisterDirectives() {

Vue.directive("click-outside", clickOutside);

}
