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
 
module DropDown {
    export class DropDown {
        constructor(){
            var tempElements=document.getElementsByClassName('drop-down')
                                     .select(x=>{
                                        (<Element>x).firstElementChild
                                                    .addEventListener('click',y=>{
                                                        y.preventDefault();
                                                        var parentElement=(<HTMLElement>y.target).parentElement;
                                                        if(parentElement.hasClass('active'))
                                                            parentElement.removeClass('active');
                                                        else
                                                            parentElement.addClass('active');
                                                        return false;
                                                    });
                                        return x;
                                     });
            window.addEventListener('click',x=>{
                var elements=document.getElementsByClassName('drop-down');
                for(var y=0;y<elements.length;++y){
                    if(x.target!=elements[y].firstElementChild){
                        elements[y].className = elements[y].className.replace('active','');
                    }
                }
            });
        }
    }
    window.addEventListener("load",x=>new DropDown());
}