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
/// <reference path="Route.ts" />
/// <reference path="./Interfaces/IRouter.ts" />
/// <reference path="./DataTypes/RouteData.ts" />

module Framework.Router {

    // Does basic path routing
    export class Router implements Interfaces.IRouter {

        // Constructor
        constructor(){
            this.routes = [];
        }

        // List of routes the system has currently
        private routes: Route[];

        // Maps a set of routes to the action specified
        public map(route: DataTypes.RouteData[]): void {
            for(let x = 0; x < route.length; ++x) {
                this.addRoute(route[x].url, route[x].action, route[x].defaultValues);
            }
        }

        // Adds a route to the router
        public addRoute(url: string, callback: (parameters: Types.StringDictionary<any>) => void, defaultValues?: Types.StringDictionary<any>): Router {
            let routes = this.routes.filter(x => x.isRoute(url));
            if(routes.length === 0) {
                this.routes.push(new Route(url, callback, defaultValues));
            } else {
                routes[0].addCallback(callback);
            }
            return this;
        }

        // Runs the url specified and returns true if it ran successfully, false otherwise.
        public run(url: string): boolean {
            for (let x = 0; x < this.routes.length; ++x) {
                if (this.routes[x].run(url)) {
                    return true;
                }
            }
            return false;
        }
    }
}