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

module DropDown {
    export class DropDown implements Component.Interfaces.IComponent {
        constructor() {
            document.getElementsByClassName("drop-down")
                    .map(x => {
                    (<Element>x).firstElementChild
                                .addEventListener("click", y => {
                                    y.preventDefault();
                                    let parentElement = (<HTMLElement>y.target).getParentByClass("drop-down");
                                    if (parentElement.hasClass("active")) {
                                        parentElement.removeClass("active");
                                    } else {
                                        parentElement.addClass("active");
                                    }
                                    return false;
                                });
                    return x;
                    });
            window.addEventListener("click", x => {
                let elements = document.getElementsByClassName("drop-down");
                for (let y = 0; y < elements.length; ++y) {
                    if ((<HTMLElement>x.target).getParentByClass("drop-down") !== elements[y]) {
                        elements[y].className = elements[y].className.replace("active", "");
                    }
                }
            });
        }
    }
    window.addEventListener("load", x => new DropDown());
}
