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
/// <reference path="../Interfaces/IComponent.ts" />
/// <reference path="../../Extensions/HTMLElement.ts" />
/// <reference path="../../Extensions/NodeList.ts" />

module TableFilter {

    export class TableFilter implements Component.Interfaces.IComponent {

        constructor() {
            this.tables = [];
            document.getElementsByTagName("table")
                    .filter(x => (<HTMLElement>x).hasClass("filterable"))
                    .map(x => <HTMLTableElement>x)
                    .map(x => {
                        this.tables = this.tables.concat(x);
                        this.makeFilterable(x);
                    });
        }

        private tables: HTMLElement[];

        private makeFilterable(table: HTMLTableElement): void {
            ;
        }
    }

    window.addEventListener("load", x => new TableFilter());
}