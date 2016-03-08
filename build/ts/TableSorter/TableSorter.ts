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



module TableSorter {
    export class TableSorter implements Component.Interfaces.IComponent {
        
        constructor(){
            this.tables=[];
            document.getElementsByTagName('table')
                    .filter(x=>(<HTMLElement>x).hasClass('sortable'))
                    .map(x=><HTMLTableElement>x)
                    .map(x=>{
                        this.tables=this.tables.concat(x);
                        this.makeSortable(x);
                    });
        }
        
        guessDataType(table:HTMLTableElement,index:number):string {
            var bodies=table.getElementsByTagName('tbody');
            var returnValue='string';
            for (var x = 0; x < bodies[0].rows.length; ++x) {
                var cellText=bodies[0].rows[x]
                                      .getElementsByTagName('td')[index]
                                      .innerText
                                      .replace(/^\s+|\s+$/g, '');
                if (cellText != '') {
                    if (cellText.match(/^-?[£$¤]?[\d,.]+%?$/)) {
                        return 'number';
                    }
                    var dateParts = cellText.match(TableSorter.dateRegex)
                    if (dateParts) {
                        var first = parseInt(dateParts[1]);
                        var second = parseInt(dateParts[2]);
                        if (first > 12) {
                            return 'DDMM Date';
                        }
                        else if (second > 12) {
                            return 'MMDD Date';
                        }
                        else {
                            returnValue='MMDD Date';
                        }
                    }
                }
            }
            return returnValue;
        }
        
        sort(table:HTMLTableElement,header:HTMLTableHeaderCellElement):void{
            var headers=table.getElementsByTagName('thead');
            var bodies=table.getElementsByTagName('tbody');
            var lastHeaderRow=headers[0].rows[headers[0].rows.length-1].getElementsByTagName('th');
            for(var x=0;x<lastHeaderRow.length;++x){
                if(lastHeaderRow[x]!=header){
                    lastHeaderRow[x].replaceClass('headerSortUp','');
                    lastHeaderRow[x].replaceClass('headerSortDown','');
                }
            }
            if(header.hasClass('headerSortUp')) {
                header.replaceClass('headerSortUp','headerSortDown');
                this.reverse(table.getElementsByTagName('tbody')[0]);
                return;
            }
            else if(header.hasClass('headerSortDown')) {
                header.replaceClass('headerSortDown','headerSortUp');
                this.reverse(table.getElementsByTagName('tbody')[0]);
                return;
            }
            header.className+=' headerSortUp';
            var tempData= [];
            var col = header.attribute('data-columnIndex');
            var sortFunction = header.attribute('data-sortFunction');
            var rows = bodies[0].rows;
            var length=rows.length;
            for (var x = 0; x < length; ++x) {
                tempData=tempData.concat({key: rows[0].getElementsByTagName('td')[col]
                                                      .innerText
                                                      .replace(/^\s+|\s+$/g, ''),
                                          value: rows[0]});
                bodies[0].removeChild(rows[0]);
            }
            if(sortFunction=='string'){
                tempData=tempData.sort(this.sortString);
            }
            else if(sortFunction=='number'){
                tempData=tempData.sort(this.sortNumber);
            }
            else if(sortFunction=='date'){
                tempData=tempData.sort(this.sortDate);
            }
            else if(sortFunction=='MMDD Date'){
                tempData=tempData.sort(this.sortMMDDDate);
            }
            else if(sortFunction=='DDMM Date'){
                tempData=tempData.sort(this.sortDDMMDate);
            }

            for (var x = 0; x < tempData.length; ++x) {
                bodies[0].appendChild(tempData[x].value);
            }
        }
        
        private sortString(value1:any,value2:any):number{
            if(value1.key==value2.key) return 0;
            if(value1.key<value2.key)return -1;
            return 1;
        }
        
        private sortNumber(val1:any,val2:any):number{
            var value1=parseFloat(val1.key.replace(/[^0-9.-]/g, ''));
            var value2=parseFloat(val2.key.replace(/[^0-9.-]/g, ''));
            if(isNaN(value1)) value1=0;
            if(isNaN(value2)) value2=0;
            return value1-value2;
        }
        
        private sortDate(val1:any,val2:any):number{
            var value1=new Date(val1.key);
            var value2=new Date(val2.key);
            if(isNaN(value1.getTime())) value1=new Date(0);
            if(isNaN(value2.getTime())) value2=new Date(0);
            if(value1==value2) return 0;
            if(value1<value2) return -1;
            return 1;
        }
        
        private sortMMDDDate(val1:any,val2:any):number{
            var match=val1.key.match(TableSorter.dateRegex);
            var year=match[3],day=match[2],month=match[1];
            if(month.length==1)month='0'+month;
            if(day.length==1)day='0'+day;
            var value1=year+month+day;
            
            match=val2.key.match(TableSorter.dateRegex);
            year=match[3];
            day=match[2];
            month=match[1];
            if(month.length==1)month='0'+month;
            if(day.length==1)day='0'+day;
            var value2=year+month+day;
            if(value1==value2) return 0;
            if(value1<value2) return -1;
            return 1;
        }
        
        private sortDDMMDate(val1:any,val2:any):number{
            var match=val1.key.match(TableSorter.dateRegex);
            var year=match[3],day=match[1],month=match[2];
            if(month.length==1)month='0'+month;
            if(day.length==1)day='0'+day;
            var value1=year+month+day;
            
            match=val2.key.match(TableSorter.dateRegex);
            year=match[3];
            day=match[1];
            month=match[2];
            if(month.length==1)month='0'+month;
            if(day.length==1)day='0'+day;
            var value2=year+month+day;
            if(value1==value2) return 0;
            if(value1<value2) return -1;
            return 1;
        }
        
        private reverse(tbody:HTMLTableSectionElement):void {
            var newrows = [];
            for (var i = 0; i < tbody.rows.length; i++) {
                newrows[newrows.length] = tbody.rows[i];
            }
            for (var i = newrows.length - 1; i >= 0; i--) {
                tbody.appendChild(newrows[i]);
            }
        }
        
        private makeSortable(table:HTMLTableElement):void{
            var headers=table.getElementsByTagName('thead');
            if(headers.length==0) return;
            
            var bodies=table.getElementsByTagName('tbody');
            if(bodies.length==0) return;
            
            var lastHeaderRow=headers[0].rows[headers[0].rows.length-1].getElementsByTagName('th');
            
            for(var x=0;x<lastHeaderRow.length;++x){
                lastHeaderRow[x].attribute('data-columnIndex',x.toString());
                lastHeaderRow[x].attribute('data-sortFunction',this.guessDataType(table,x));
                lastHeaderRow[x].addEventListener('click',y=>this.sort(table,<HTMLTableHeaderCellElement>y.target));
            }
        }
        
        private tables:HTMLElement[];
        
        private static dateRegex= /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;
    }
    window.addEventListener("load",x=>new TableSorter());
}