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
/// <reference path="../Component/Interfaces/IComponent.ts" />
/// <reference path="../Component/Extensions/HTMLElement.ts" />
/// <reference path="../Component/Extensions/NodeList.ts" />

module Closer {
    export class Closer implements Component.Interfaces.IComponent {
        constructor() {
            document.getElementsByClassName("close")
                    .map(x => {
                        x.addEventListener("click", y => this.close(<HTMLElement>y.target));
                        return x;
                    });
        }

        private close(target: HTMLElement): void {
            let elementToClose = target.attribute("data-close");
            let element = target.getParentByClass(elementToClose);
            if (!element) { return; }
            element.hide();
        }
    }
    window.addEventListener("load", x => new Closer());
}
