<template>
  <table class="sortable" v-cloak>
        <thead>
            <tr>
                <th v-for="key in internalColumns" v-bind:key="key"
                @click="sortBy(key)"
                :class="{ active: sortKey == key.property,
                            headerSortUp: sortKey == key.property && sortOrders[key.property] > 0,
                            headerSortDown: sortKey == key.property && sortOrders[key.property] < 0 }"
                :draggable="draggable"
                @dragstart="dragstart"
                @dragenter="dragenter"
                :columnName="key.property">
                {{ key.display | capitalize }}
                </th>
            </tr>
        </thead>
        <template v-if="filteredGroups">
            <tbody v-for="(group, index) in filteredGroups" v-bind:key="index">
                <tr v-if="group !== ''" class="grid-group-header"><td :colspan="internalColumns.length">{{ group }}</td></tr>
                <tr v-for="(entry, index) in filteredData" v-bind:key="index">
                    <template v-if="(groupBy in entry && entry[groupBy] === group) || group === ''">
                        <td v-for="key in internalColumns" v-html="formatValue(entry[key.property], key)" v-bind:key="key">
                        </td>
                    </template>
                </tr>
                <tr v-if="anySum" class="grid-group-footer"><td :colspan="internalColumns.length">Totals:</td></tr>
                <tr v-if="anySum" class="grid-group-footer">
                    <td v-for="key in internalColumns" v-html="filteredColumnSum(group, key)" v-bind:key="key">
                    </td>
                </tr>
            </tbody>
        </template>
        <template v-else>
            <tbody>
                <tr v-for="(entry, index) in filteredData" v-bind:key="index">
                    <td v-for="key in internalColumns" v-html="formatValue(entry[key.property], key)" v-bind:key="key">
                    </td>
                </tr>
                <tr v-if="anySum"><td :colspan="internalColumns.length"><b>Totals:</b></td></tr>
                <tr v-if="anySum">
                    <td v-for="key in internalColumns" v-html="filteredColumnSum('', key)" v-bind:key="key">
                    </td>
                </tr>
            </tbody>
        </template>
        <tfoot v-if="pageable">
            <tr>
                <td :colspan="internalColumns.length">
                    <div class="right">Page {{ page }} of {{ finalPage }}</div>
                    <ul class="paged">
                        <li class="cursor-pointer fa-fast-backward text-center" v-on:click="setPage(1)" v-bind:class="{ 'disabled': (page==1) }"></li>
                        <li class="cursor-pointer fa-step-backward text-center" v-on:click="setPage(page-1)" v-bind:class="{ 'disabled': (page==1) }"></li>
                        <li class="cursor-pointer text-center" v-for="n in (endPage-startPage)" v-on:click="setPage(startPage+n)" v-bind:class="{ 'active': (page==(startPage+n)) }">{{ startPage+n }}</li> 
                        <li class="cursor-pointer fa-step-forward text-center" v-on:click="setPage(page+1)" v-bind:class="{ 'disabled': (page==finalPage) }"></li>
                        <li class="cursor-pointer fa-fast-forward text-center" v-on:click="setPage(finalPage)" v-bind:class="{ 'disabled': (page==finalPage) }"></li>
                    </ul>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import Vue from 'vue'

let dateRegex = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;

export default Vue.extend({
    watch: {
        columns: function(newColumns, oldColumns) {
            this.internalColumns.length = 0;
            this.sortOrders.length = 0;
            for (let x = 0; x <this.columns.length; ++x) {
                let column: any = this.columns[x];
                this.internalColumns.push(this.getColumnInfo(column));
            }
            this.internalColumns.forEach(function (key: any) {
                key = key.property.replace(/\s+/g, "").trim();
                this.sortOrders[key.toString()] = 1;
            });
        }
    },
    computed: {
        anySum: function() {
            return this.internalColumns.some((item: any) => {
                return item.sum;
            });
        },
        filteredGroups: function() {
            if(!this.groupBy) return;
            let filterKey = this.filterKey && this.filterKey.toLowerCase();
            let returnData = [];
            for(let x = 0; x < this.data.length; ++x) {
                let contentText = this.data[x][this.groupBy].toString();
                if (returnData.indexOf(contentText) === -1) {
                    returnData.push(contentText);
                }
            }
            if (filterKey) {
                returnData = returnData.filter(function (row: any) {
                    return String(row).toLowerCase().indexOf(filterKey) > -1;
                });
            }
            return returnData.sort(function(a: any, b: any): number {
                if (a === b) { return 0; }
                if (a < b) { return -1; }
                return 1;
            });
        },
        finalPage: function() {
            return Math.ceil(this.total/this.pageSize);
        },
        startPage: function() {
            return (Math.floor((this.page-1)/10)*10);
        },
        endPage: function() {
            let tempPage= (Math.floor((this.page-1)/10)*10)+10;
            if(tempPage>this.finalPage)
                return this.finalPage;
            return tempPage;
        },
        filteredData: function () {
            let sortKey = this.sortKey;
            let filterKey = this.filterKey && this.filterKey.toLowerCase();
            let order = this.sortOrders[sortKey] || 1;
            let data = this.data;
            if (filterKey) {
                data = data.filter(function (row: any) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
                    });
                });
            }
            if (sortKey) {
                let sortFunction = this.internalColumns[this.getColumnIndex(this.sortKey)].dataType;
                if (sortFunction === "string") {
                    data = data.sort(this.sortString);
                } else if (sortFunction === "number") {
                    data = data.sort(this.sortNumber);
                } else if (sortFunction === "date") {
                    data = data.sort(this.sortDate);
                } else if (sortFunction === "MMDD Date") {
                    data = data.sort(this.sortMMDDDate);
                } else if (sortFunction === "DDMM Date") {
                    data = data.sort(this.sortDDMMDate);
                }
                if (order === 1) {
                    this.data.reverse();
                }
            }
            return data;
        },
    },
    data: function () {
        let that = this;
        let sortOrders: any = {};
        let internalColumns:any[] = [];
        for (let x = 0; x <this.columns.length; ++x) {
            let column: any = this.columns[x];
            internalColumns.push(that.getColumnInfo(column));
        }
        internalColumns.forEach(function (key: any) {
            key = key.property.replace(/\s+/g, "").trim();
            sortOrders[key.toString()] = 1;
        });
        return {
            sortKey: "",
            sortOrders: sortOrders,
            direction: 0,
            draggedColumn: null,
            internalColumns: internalColumns
        };
    },
    methods: {
        getColumnInfo: function(column: any) {
            let internalColumn: any = {};
            if(typeof column === "string") {
                internalColumn.property = column.replace(/\s+/g, "").trim();
                internalColumn.display = this.fixHeader(column);
                internalColumn.dataType = this.guessDataType(column);
                internalColumn.sum = false;
                internalColumn.locales = "en-US";
                internalColumn.format = {};
            } else {
                if ("property" in column) {
                    internalColumn.property = column.property.replace(/\s+/g, "").trim();
                }
                if ("dataType" in column) {
                    internalColumn.dataType = column.dataType;
                } 
                if ("sum" in column) {
                    internalColumn.sum = column.sum;
                }
                if ("locales" in column) {
                    internalColumn.locales = column.locales;
                }
                if ("format" in column) {
                    internalColumn.format = column.format;
                }
                if ("display" in column) {
                    internalColumn.display = column.display;
                }
            }
            if (!("property" in internalColumn)) {
                internalColumn.property = internalColumn.display.replace(/\s+/g, "").trim();
            } 
            if (!("dataType" in internalColumn)) {
                internalColumn.dataType = this.guessDataType(internalColumn.property);
            }
            if (!("sum" in internalColumn)) {
                internalColumn.sum = false;
            }
            if (!("locales" in internalColumn)) {
                internalColumn.locales = "en-US";
            }
            if (!("format" in internalColumn)) {
                internalColumn.format = {};
            }
            if (!("display" in internalColumn)) {
                internalColumn.display = this.fixHeader(internalColumn.property);
            }
            return internalColumn;
        },
        guessDataType: function(column: string) {
            let tempDiv = document.createElement("div");
            let returnValue = "string";
            for (let x = 0; x < this.data.length; ++x) {
                if(!(column in this.data[x])) {
                    continue;
                }
                let cellText = this.data[x][column].toString();
                tempDiv.innerHTML = cellText;
                cellText = (tempDiv.textContent || tempDiv.innerText || "").replace(/^\s+|\s+$/g, "");
                if (cellText !== "") {
                    if (cellText.match(/^-?[£$¤]?[\d,.]+%?$/) && !cellText.match(/^\d\d\d.\d\d\d.\d\d\d\d$/)) {
                        return "number";
                    }
                    let dateParts = cellText.match(dateRegex);
                    if (dateParts) {
                        let first = parseInt(dateParts[1], 10);
                        let second = parseInt(dateParts[2], 10);
                        if (first > 12) {
                            return "DDMM Date";
                        } else if (second > 12) {
                            return "MMDD Date";
                        } else {
                            returnValue = "MMDD Date";
                        }
                    }
                }
            }
            return returnValue;
        },
        getColumnIndex: function(column: string) {
            for(let x = 0; x < this.internalColumns.length; ++x) {
                if (this.internalColumns[x].property === column) {
                    return x;
                }
            }
            return -1;
        },
        move: function(array: Array<any>, old_index: number, new_index: number) {
            if (old_index < 0) {
                old_index = 0;
            }
            if (new_index < 0) {
                new_index = 0;
            }
            if (new_index >= array.length) {
                new_index=array.length-1;
            }
            array.splice(new_index, 0, array.splice(old_index, 1)[0]);  
            return array;
        },
        dragenter: function(event: DragEvent) {
            let targetElement = (<Element>event.target);
            if (targetElement.nodeName === "TD") {
                targetElement = <Element>targetElement.parentNode;
            }

            if(this.draggedColumn.parentNode !== targetElement.parentNode) {
                return;
            }

            let targetColumn = targetElement.getAttribute('columnname');
            let sourceColumn = this.draggedColumn.getAttribute('columnname');

            if (this.getColumnIndex(sourceColumn) < this.getColumnIndex(targetColumn)) {
                let targetColumnIndex = this.getColumnIndex(targetColumn) + 1;
                let sourceColumnIndex = this.getColumnIndex(sourceColumn);
                this.internalColumns = this.move(this.internalColumns, sourceColumnIndex, targetColumnIndex);
            } else {
                let targetColumnIndex = this.getColumnIndex(targetColumn);
                let sourceColumnIndex = this.getColumnIndex(sourceColumn);
                this.internalColumns = this.move(this.internalColumns, sourceColumnIndex, targetColumnIndex);
            }
            this.$emit("reorder", { columns: this.internalColumns });
        },
        dragstart: function(event: DragEvent) {
            this.draggedColumn = (<Element>event.target);
            event.dataTransfer.effectAllowed = "move";
        },
        filteredColumnSum: function(group: any, key: any) {
            if(!key.sum) {
                return "";
            }
            let total = 0;
            let data = this.filteredData;
            for(let x=0;x<data.length;++x) {
                if(data[x][this.groupBy] === group) {
                    total += this.getNumber(data[x][key.property]);
                }
            }
            return this.formatValue(total, key);
        },
        formatValue: function(value: any, column: any): string {
            if(!value || column.dataType === "string") {
                return value || "";
            }
            let valueType = typeof value;
            if (column.dataType === "number") {
                if (valueType === "number") {
                    return new Intl.NumberFormat(column.locales, column.format).format(value);
                }
                if ((valueType === "string" && value.match(/^-?[£$¤]?[\d,.]+%?$/) && !value.match(/^\d\d\d.\d\d\d.\d\d\d\d$/))) {
                    return new Intl.NumberFormat(column.locales, column.format).format(this.getNumber(value));
                }
            } else if (column.dataType === "date") {
                if (valueType === "number") {
                    return new Intl.DateTimeFormat(column.locales, column.format).format(value);
                }
                if (valueType === "string") {
                    return new Intl.DateTimeFormat(column.locales, column.format).format(new Date(value));
                }
            }
            return value;
        },
        fixHeader: function(column: string) {
            return column.replace("_", " ").replace("-", " ").replace(/([a-z])([A-Z])/g, "$1 $2");
        },
        setPage: function(currentPage: Number) {
            if(currentPage>this.finalPage)
                this.page=this.finalPage;
            else if(currentPage<1)
                this.page=1;
            else
                this.page=currentPage;
            this.$emit("pagechange", { page: this.page, filter: this.filterKey, sortKey: this.sortKey, direction: this.direction });
        },
        sortBy: function (key: any) {
            key = key.property;
            this.sortKey = key;
            let tempSortOrder: any = {};
            if (!(key in this.sortOrders)) {
                tempSortOrder[key] = 1;
            } else {
                tempSortOrder[key] = this.sortOrders[key];
            }
            tempSortOrder[key] = tempSortOrder[key] * -1;
            this.direction = tempSortOrder[key];
            this.sortOrders = tempSortOrder;
            this.$emit("pagechange", { page: this.page, filter: this.filterKey, sortKey: this.sortKey, direction: this.direction });
        },
        sortDDMMDate: function(val1: any, val2: any): number {
            let actualValue1 = this.stripHTML(val1[this.sortKey].toString());
            let actualValue2 = this.stripHTML(val2[this.sortKey].toString());
            let match = actualValue1.match(dateRegex);
            let year = match[3], day = match[1], month = match[2];
            if (month.length === 1) { month = "0" + month; }
            if (day.length === 1) { day = "0" + day; }
            let value1 = year + month + day;

            match = actualValue2.match(dateRegex);
            year = match[3];
            day = match[1];
            month = match[2];
            if (month.length === 1) { month = "0" + month; }
            if (day.length === 1) { day = "0" + day; }
            let value2 = year + month + day;
            if (value1 === value2) { return 0; }
            if (value1 < value2) { return -1; }
            return 1;
        },
        sortDate: function(val1: any, val2: any): number {
            let actualValue1 = this.stripHTML(val1[this.sortKey].toString());
            let actualValue2 = this.stripHTML(val2[this.sortKey].toString());
            let value1 = new Date(actualValue1);
            let value2 = new Date(actualValue2);
            if (isNaN(value1.getTime())) { value1 = new Date(0); }
            if (isNaN(value2.getTime())) { value2 = new Date(0); }
            if (value1 === value2) { return 0; }
            if (value1 < value2) { return -1; }
            return 1;
        },
        sortMMDDDate: function(value1: any, value2: any): number {
            let actualValue1 = this.stripHTML(value1[this.sortKey].toString());
            let actualValue2 = this.stripHTML(value2[this.sortKey].toString());
            let match = actualValue1.match(dateRegex);
            let year = match[3], day = match[2], month = match[1];
            if (month.length === 1) { month = "0" + month; }
            if (day.length === 1) { day = "0" + day; }
            let val1 = year + month + day;

            match = actualValue2.match(dateRegex);
            year = match[3];
            day = match[2];
            month = match[1];
            if (month.length === 1) { month = "0" + month; }
            if (day.length === 1) { day = "0" + day; }
            let val2 = year + month + day;
            if (val1 === val2) { return 0; }
            if (val1 < val2) { return -1; }
            return 1;
        },
        getNumber: function(value: any): number {
            if(!value) 
                return 0;
            return parseFloat(this.stripHTML(value.toString()).replace(/[^0-9.-]/g, ""));
        },
        sortNumber: function(value1: any, value2: any): number {
            let actualValue1 = this.getNumber(value1);
            let actualValue2 = this.getNumber(value2);
            if (isNaN(actualValue1)) { actualValue1 = 0; }
            if (isNaN(actualValue2)) { actualValue2 = 0; }
            return actualValue1 - actualValue2;
        },
        sortString: function(value1: any, value2: any): number {
            let actualValue1 = this.stripHTML(value1[this.sortKey].toString());
            let actualValue2 = this.stripHTML(value2[this.sortKey].toString());
            if (actualValue1 === actualValue2) { return 0; }
            if (actualValue1 < actualValue2) { return -1; }
            return 1;
        },
        stripHTML: function(value: any): any {
            let tempDiv = document.createElement("div");
            tempDiv.innerHTML = value;
            return (tempDiv.textContent || tempDiv.innerText || "").replace(/^\s+|\s+$/g, "");
        },
    },
    props: {
        columns: Array,
        data: Array,
        filterKey: String,
        total: Number,
        page: Number,
        pageSize: Number,
        pageable: Boolean,
        draggable: Boolean,
        groupBy: String,
    }
});
</script>