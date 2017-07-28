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

module Tabs {
    export class Tabs implements Component.Interfaces.IComponent {
        constructor() {
            document.getElementsByClassName("tabs")
                    .map(x => {
                        this.changeTab((<HTMLElement>(<HTMLElement>x).getElementsByClassName("tab").item(0)));
                        (<Element>x).getElementsByClassName("tab")
                                    .map(y => {
                                        y.addEventListener("click", z => {
                                            z.preventDefault();
                                            this.changeTab(<HTMLElement>z.target);
                                            return false;
                                        });
                                        if ((<HTMLElement>y).attribute("data-selected") !== null) {
                                            this.changeTab((<HTMLElement>y));
                                        }
                                        return y;
                                    });
                        return x;
                    });
        }

        private changeTab(target: HTMLElement): void {
            let tabElement = target.attribute("data-content");
            target.getParentByClass("tabs")
                  .getElementsByClassName("tab")
                  .map(x => {
                        (<HTMLElement>x).removeClass("selected");
                   });
            target.getParentByClass("tabs")
                  .getElementsByTagName("section")
                  .map(x => {
                      (<HTMLElement>x).hide();
                   });
            let element = document.getElementById(tabElement);
            if (!element) { return; }
            target.addClass("selected");
            element.show();
        }
    }
}
