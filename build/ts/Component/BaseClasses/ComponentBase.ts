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
/// <reference path="../Interfaces/IComponent" />


module Component.BaseClasses {
    export class ComponentBase implements Component.Interfaces.IComponent {
        constructor(private element:HTMLElement){
            this.name=element.id;
        }
        
        public name:string;
        
        protected show():void {
            this.element.className=this.element.className.replace('hidden','show');
            if(this.element.className.indexOf('show') == -1) {
                this.element.className+=' show';
            }
        }
        
        protected hide():void{
            this.element.className=this.element.className.replace('show','hidden');
            if(this.element.className.indexOf('hidden') == -1) {
                this.element.className+=' hidden';
            }
        }
    }
}