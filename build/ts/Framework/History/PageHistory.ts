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

module Framework.History {

    // Wrapper for history object
    export class PageHistory {

        // Goes back by the value specified
        public static back(delta?: number): void {
            if (delta === undefined) {
                delta = 1;
            }
            window.history.go(-1 * delta);
        }

        // Goes forward by the value specified
        public static forward(delta?: number): void {
            if (delta === undefined) {
                delta = 1;
            }
            window.history.go(delta);
        }

        // pushes a new url/state onto the history
        public static push(state: any, url?: string, title?: string): void {
            window.history.pushState(state, title, url);
        }

        // replaces the current url with a new url/state
        public static replace(state: any, url?: string, title?: string): void {
            window.history.replaceState(state, title, url);
        }

        // gets the current state
        static get state(): any {
            return window.history.state;
        }

        // Returns the number of items in storage
        static get length(): number {
            return window.history.length;
        }
    }
}