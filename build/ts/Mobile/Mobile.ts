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
 
module Mobile {
    export class Mobile {
        constructor(){
            Mobile.menuElements=[];
            document.getElementsByClassName('mobile')
                    .select(x=>{
                        let tempElement=<HTMLElement>x;
                        if(tempElement.hasClass('menu')){
                            var id=tempElement.id;
                            var item=tempElement;
                            Mobile.menuElements=Mobile.menuElements.concat({key:item.id,value:item});
                            var menuElement=document.createElement('a');
                            menuElement.href='#';
                            menuElement.className='ion-navicon hidden-on-desktop display-on-tablet-landscape extra-large mobile-toggler';
                            menuElement.addEventListener('click',y=>{
                                (<HTMLElement>(y.target)).addClass('hidden');
                                Mobile.show(id);
                                y.preventDefault();
                            });
                            tempElement.parentElement.appendChild(menuElement);
                        }
                    });
            window.addEventListener('click',x=>{
                let tempElement=(<HTMLElement>x.target);
                if(tempElement.getParentByClass('mobile')==null
                    &&tempElement.getParentByClass('mobile-toggler')==null
                    &&!tempElement.hasClass('mobile-toggler')){
                        document.getElementsByClassName('mobile')
                                .select(x=> (<HTMLElement>x).removeClass('show'));
                        document.getElementsByClassName('mobile-toggler')
                                .select(x=> (<HTMLElement>x).removeClass('hidden'));                    
                }
            });
        }
                
        public static show(id:string):void{
            Mobile.menuElements.filter(x=>x.key==id).forEach(x=>x.value.show());
        }
        
        public static hide(id:string):void{
            Mobile.menuElements.filter(x=>x.key==id).forEach(x=>x.value.hide());
        }
        
        private static menuElements:{key:string,value:HTMLElement}[];
    }
    window.addEventListener("load",x=>new Mobile());
}