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
 /// <reference path="../Component/Interfaces/IComponent" />
 /// <reference path="../Component/Extensions/HTMLElement" />
 /// <reference path="../Component/Extensions/NodeList" />
 
 

module Modal {
    export class Modal {
        constructor(){
            Modal.modalElements=[];
            document.getElementsByClassName('modal')
                    .select(x=>{
                        var item=<HTMLElement>x;
                        Modal.modalElements=Modal.modalElements.concat({key:item.id,value:item});
                    });
            document.getElementsByClassName('modal-opener')
                    .select(x=>{
                        var tempItem=(<HTMLElement>x).attribute('data-modal');
                        x.addEventListener('click',y=>Modal.show(tempItem));
                    });
        }
        
        public static show(id:string):void{
            Modal.modalElements.filter(x=>x.key==id).forEach(x=>x.value.show());
        }
        
        public static hide(id:string):void{
            Modal.modalElements.filter(x=>x.key==id).forEach(x=>x.value.hide());
        }
        
        private static modalElements:{key:string,value:HTMLElement}[];
    }
    window.addEventListener("load",x=>new Modal());
}