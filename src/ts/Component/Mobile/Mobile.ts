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

/// <reference path="../../Extensions/HTMLElement.ts" />
/// <reference path="../../Extensions/NodeList.ts" />

import { IComponent } from '../Interfaces/IComponent'

export class Mobile implements IComponent {
    constructor() {
        Mobile.menuElements = [];
        this.map(document.getElementsByClassName("mobile"),
                x => {
                    let tempElement = <HTMLElement>x;
                    if (tempElement.hasClass("menu")) {
                        let id = tempElement.id;
                        let item = tempElement;
                        Mobile.menuElements = Mobile.menuElements.concat({key: item.id, value: item});
                        let menuElement = document.createElement("a");
                        menuElement.href = "#";
                        menuElement.className = "fa-bars hidden-on-desktop display-on-tablet-landscape extra-large mobile-toggler";
                        menuElement.addEventListener("click", y => {
                            (<HTMLElement>(y.target)).addClass("hidden");
                            Mobile.show(id);
                            y.preventDefault();
                        });
                        tempElement.parentElement.appendChild(menuElement);
                    }
                });
        window.addEventListener("click", x => {
            let tempElement = (<HTMLElement>x.target);
            if (tempElement.getParentByClass("mobile") == null
                && tempElement.getParentByClass("mobile-toggler") == null
                && !tempElement.hasClass("mobile-toggler")) {
                    this.map(document.getElementsByClassName("mobile"),
                            y => (<HTMLElement>y).removeClass("show"));
                    this.map(document.getElementsByClassName("mobile-toggler"),
                            y => (<HTMLElement>y).removeClass("hidden"));
            }
        });
    }

    private map<TResult>(elements: HTMLCollectionOf<Element>, callback: (x: Node) => TResult): TResult[] {
        let ReturnValues: TResult[] = [];
        for (let x = 0; x < elements.length; ++x) {
            ReturnValues = ReturnValues.concat(callback(elements[x]));
        }
        return ReturnValues;
    }

    public static show(id: string): void {
        Mobile.menuElements.filter(x => x.key === id).forEach(x => x.value.show());
    }

    public static hide(id: string): void {
        Mobile.menuElements.filter(x => x.key === id).forEach(x => x.value.hide());
    }

    private static menuElements: {key: string, value: HTMLElement}[];
}
