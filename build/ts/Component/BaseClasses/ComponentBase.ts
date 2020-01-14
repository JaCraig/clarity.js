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

import { IComponent } from "../Interfaces/IComponent";

export class ComponentBase implements IComponent {
    constructor(private element: HTMLElement) {
        this.name = element.id;
    }

    public name: string;

    protected show(): void {
        this.element.replaceClass("hidden", "show");
        if (!this.element.hasClass("show")) {
            this.element.addClass("show");
        }
    }

    protected hide(): void {
        this.element.replaceClass("show", "hidden");
        if (!this.element.hasClass("hidden")) {
            this.element.addClass("hidden");
        }
    }
}
