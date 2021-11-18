<template>
    <div v-cloak>
        <div>
            <span class="Right do-not-print" v-if="searchable">
                Search:
                <input type="text" placeholder="Filter Entries" v-model="filterKey" @keyup="filterChanged" />
            </span>
            <span v-if="paged" class="do-not-print">
                Show
                <select v-model="pageSize">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="-1">All</option>
                </select>
                entries
            </span>
        </div>
        <br class="Clear" />
        <div class="quick-nav do-not-print" v-if="quickNav && filteredGroups">
            Quick nav: 
            <div style="display: inline-block" v-for="group in filteredGroups" :key="group">
                <a :href="'#'+group">{{group}}</a>
            </div>
        </div>
        <br />
        <table class="sortable" id="filteredTable">
            <thead>
                <tr>
                    <th v-for="(column, index) in internalColumns" v-bind:key="column"
                        @click="sortBy(column, index)"
                        :class="{ active: sortKey == index,headerSortUp: sortKey==index && column.sortDirection > 0,headerSortDown: sortKey == index && column.sortDirection < 0 }"
                        :columnName="column.property">
                        {{ $filters.capitalize(column.display) }}
                        <div v-if="column.filter && getFilter(column.filter).type !='dropdown'" class="do-not-print">
                            <input :type="getFilter(column.filter).type" :placeholder="getFilter(column.filter).placeholder" v-model="getFilter(column.filter).value" :list="column.property" @click.stop.prevent @keyup="filterChanged" />
                            <datalist :id="column.property">
                                <option v-for="value in getDistinctValues(column)" :key="value">{{value}}</option>
                            </datalist>
                        </div>
                        <div v-if="column.filter && getFilter(column.filter).type =='dropdown'" class="do-not-print">
                            <select v-model="getFilter(column.filter).value" @click.stop.prevent @change="filterChanged">
                                <option v-for="value in getDistinctValues(column)" :key="value">{{value}}</option>
                            </select>
                        </div>
                    </th>
                </tr>
            </thead>
            <template v-if="filteredGroups">
                <tbody v-for="group in filteredGroups" v-bind:key="group">
                    <tr v-if="group!==''" class="grid-group-header"><td :colspan="internalColumns.length"><a :id="group"></a>{{ group }}</td></tr>
                    <tr v-for="(entry, index) in getPeopleInGroup(group)" v-bind:key="index" @click="rowClicked(entry)">
                        <td v-for="column in entry.columns" v-bind:key="column" :class="entry.style">
                            <div v-for="item in column.data" :key="item">
                                <div v-html="item.value" v-if="!item.url"></div>
                                <a v-html="item.value" v-if="item.url" :href="item.url"></a>
                            </div>
                        </td>
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
                    <tr v-for="(entry, index) in filteredData" v-bind:key="index" @click="rowClicked(entry)" :class="entry.style" :id="entry.id">
                        <td v-for="column in entry.columns" v-bind:key="column" :class="entry.style">
                            <div v-for="item in column.data" :key="item">
                                <div v-html="item.value" v-if="!item.url"></div>
                                <a v-html="item.value" v-if="item.url" :href="item.url"></a>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="anySum"><td :colspan="internalColumns.length"><b>Totals:</b></td></tr>
                    <tr v-if="anySum">
                        <td v-for="key in internalColumns" v-html="filteredColumnSum('', key)" v-bind:key="key">
                        </td>
                    </tr>
                </tbody>
            </template>
            <tfoot v-if="pageable" class="do-not-print">
                <tr>
                    <td :colspan="internalColumns.length">
                        <div class="right">Page {{ page }} of {{ finalPage }}</div>
                        <ul class="paged">
                            <li class="cursor-pointer fa-fast-backward text-center" v-on:click="setPage(1)" v-bind:class="{ 'disabled': (page==1) }"></li>
                            <li class="cursor-pointer fa-step-backward text-center" v-on:click="setPage(page-1)" v-bind:class="{ 'disabled': (page==1) }"></li>
                            <li class="cursor-pointer text-center" v-for="n in (endPage-startPage)" v-on:click="setPage(startPage+n)" v-bind:class="{ 'active': (page==(startPage+n)) }" :key="n">{{ startPage+n }}</li>
                            <li class="cursor-pointer fa-step-forward text-center" v-on:click="setPage(page+1)" v-bind:class="{ 'disabled': (page==finalPage) }"></li>
                            <li class="cursor-pointer fa-fast-forward text-center" v-on:click="setPage(finalPage)" v-bind:class="{ 'disabled': (page==finalPage) }"></li>
                        </ul>
                    </td>
                </tr>
            </tfoot>
        </table>
        <div v-if="showCount" class="do-not-print">
            Filtered count: {{filteredData.length}}
        </div>
    </div>
</template>

<script lang="ts">
    import moment from 'moment';
    import Vue from 'vue';
    import ColumnData from "./ColumnData";
    import DatabaseSettings from './DatabaseSettings';
    import RowData from "./RowData";
    import SortFuncs from "../../Framework/Utils/SortFuncs";
    import { DataType } from './Enums/DataType';
    import { FilterType } from './Enums/FilterType';
    import { ComparisonType } from './Enums/ComparisonType';

    export default Vue.defineComponent({
        watch: {
            columns: function (newColumns, oldColumns) {
                this.internalColumns.length = 0;
                this.internalColumns = this.getColumnInfos(newColumns, this.data, this.databaseSettings);
                this.internalData = this.getData(this.internalData.map((row: any)=>row.originalData), this.internalColumns);
                this.filterChanged();
            },
            data: function (newData, oldData) {
                this.internalData.length = 0;
                this.internalData = this.getData(newData, this.internalColumns);
                this.filterChanged();
            }
        },
        computed: {
            anySum: function () {
                return this.internalColumns.some((item: any) => {
                    return item.sum;
                });
            },
            endPage: function () {
                let tempPage = (Math.floor((this.page - 1) / 10) * 10) + 10;
                if (tempPage > this.finalPage)
                    return this.finalPage;
                return tempPage;
            },
            filteredGroups: function() {
                if(!this.groupBy) return;
                let tempData: Array<any> = this.filteredData;
                let returnData = [];
                for(let x = 0; x < tempData.length; ++x) {
                    let row = tempData[x];
                    let groupValue = row.originalData[this.groupBy];
                    if(!groupValue) {
                        continue;
                    }
                    if(Array.isArray(groupValue)) {
                        for(let y = 0; y < groupValue.length; ++y){
                            let contentText = groupValue[y].toString();
                            if (returnData.indexOf(contentText) === -1) {
                                returnData.push(contentText);
                            }
                        }
                        continue;
                    }
                    let contentText = groupValue.toString();
                    if (returnData.indexOf(contentText) === -1) {
                        returnData.push(contentText);
                    }
                }
                let filter = this.filterKey?.toLowerCase();
                return returnData.filter((value:any)=>value.toLowerCase().indexOf(filter) !== -1)
                    .sort(function(a: any, b: any): number {
                        if (a === b) { return 0; }
                        if (a < b) { return -1; }
                        return 1;
                    });
            },
            filteredData: function () {
                let data = this.filter(this.internalData, this.internalColumns, this.filterKey?.toLowerCase());
                return this.sort(data, this.internalColumns, this.sortKey);
            },
            finalPage: function () {
                if (this.pageSize === -1) {
                    return 1;
                }
                return Math.ceil(this.total / this.pageSize);
            },
            pageable: function () {
                return this.pageSize > 0 && this.filteredData.length > this.pageSize;
            },
            startPage: function () {
                return (Math.floor((this.page - 1) / 10) * 10);
            },
        },
        data: function () {
            let that = this;
            let databaseSettings = new DatabaseSettings(this.saveFilters);
            let internalColumns = that.getColumnInfos(this.columns, this.data, databaseSettings);
            return {
                sortKey: -1,
                draggedColumn: null,
                internalColumns: internalColumns,
                databaseSettings: databaseSettings,
                filterKey: that.filterValue,
                internalData: that.getData(this.data, internalColumns)
            };
        },
        methods: {
            filter: function (data: Array<RowData>, columns: Array<ColumnData>, filterKey: string): Array<RowData> {
                // Main filter
                if (filterKey && this.groupBy==="") {
                    data = data.filter(function (row: any) {
                        for (let x = 0; x < row.columns.length; ++x) {
                            let column = row.columns[x];
                            if(column.data.some((item: any) => item.value.toLowerCase().indexOf(filterKey) > -1)) {
                                return true;
                            }
                        }
                        return false;
                    });
                }
                return data.filter((row: any) => {
                    for (let x = 0; x < row.columns.length; ++x) {
                        let column = row.columns[x];
                        let filterString = (column.column.filter?.value||"").toLowerCase();
                        if(filterString === "") {
                            continue;
                        }
                        if(!column.data.some((item: any) => {
                            let entry = item.value.toLowerCase();
                            if (entry === "") {
                                return false;
                            }
                            if (column.column.dataType === DataType.Date) {
                                let momentEntry = moment(entry);
                                let filterValue = moment(filterString);
                                if (!column.column.filter.comparison || column.column.filter.comparison ===  ComparisonType.After) {
                                    return !momentEntry.isBefore(filterValue);
                                }
                                return !momentEntry.isAfter(filterValue);
                            }
                            if (column.column.filter.type !== FilterType.Dropdown) {
                                return entry.indexOf(filterString) > -1;
                            } else {
                                return entry === filterString;
                            }
                        })) {
                                return false;
                            }
                    }
                    return true;
                });
            },
            filterChanged: function() {
                let returnValue: Array<any> = [];
                if(this.groupBy === "") {
                    let data = this.filteredData;
                    for (let x = 0; x < data.length; ++x) {
                        let row = data[x];
                        let newItem = {};
                        for (let y = 0; y < row.columns.length; ++y) {
                            let column = row.columns[y].column;
                            (<{[index: string]: any}>newItem)[column.property] = row.columns[y].data.map((value:any)=> value.value).join(', ');
                        }
                        returnValue.push(newItem);
                    }
                } else {
                    let groups = this.filteredGroups;
                    for (let x = 0; x < groups.length; ++x) {
                        let group = groups[x];
                        let data = this.getPeopleInGroup(group);
                        let tempHeader = {};
                        (<{[index: string]: any}>tempHeader)[data[0].columns[0].column.property] = group;
                        for (let y = 1; y < data[0].columns.length; ++y) {
                            let column = data[0].columns[y].column;
                            (<{[index: string]: any}>tempHeader)[column.property] = "";
                        }
                        returnValue.push(tempHeader);
                        for (let x = 0; x < data.length; ++x) {
                            let row = data[x];
                            let newItem = {};
                            for (let y = 0; y < row.columns.length; ++y) {
                                let column = row.columns[y].column;
                                (<{[index: string]: any}>newItem)[column.property] = row.columns[y].data.map((value:any)=> value.value).join(', ');
                            }
                            returnValue.push(newItem);
                        }
                    }
                }
                this.$emit("data-updated", { data: returnValue });
            },
            filteredColumnSum: function (group: any, key: any) {
                if (!key.sum) {
                    return "";
                }
                let total = 0;
                let data = this.filteredData;
                for (let x = 0; x < data.length; ++x) {
                    if (!this.groupBy || data[x][this.groupBy] === group) {
                        total += data[x].originalData[key.property].toString().toNumber();
                    }
                }
                return key.formatValue(total);
            },
            getColumnInfos: function (columns: Array<ColumnData | String>, data: Array<any>, databaseSettings: DatabaseSettings): Array<ColumnData> {
                return columns.map(column => new ColumnData(column,data,databaseSettings));
            },
            getData: function (data: Array<any>, columns: Array<ColumnData>): Array<RowData> {
                return data.map(row => new RowData(row, columns));
            },
            getDistinctValues: function (column: any) {
                let returnValue = [''];
                let finalData = column.filter.filtered ? this.filteredData : this.internalData;
                for (let x = 0; x < finalData.length; ++x) {
                    let entries = finalData[x].columns
                                                .find((tempColumn: any) => tempColumn.column.property === column.property)
                                                ?.data
                                                .map((data: any)=>data.value) || [];
                    for (let y = 0; y < entries.length; ++y) {
                        returnValue.push(entries[y]);
                    }
                }
                return returnValue.filter((value, index, self) => self.indexOf(value) === index)
                                    .sort(SortFuncs.sortString);
            },
            getFilter: function (filter: any) {
                return filter || { type: "", value: "" };
            },
            getPeopleInGroup: function(group: string): Array<any> {
                let data = this.filteredData;
                let returnValue = [];
                for(let x = 0; x < data.length; ++x) {
                    let row = data[x].originalData;
                    if(this.isInGroup(row[this.groupBy], group)) {
                        returnValue.push(data[x]);
                    }
                }
                return returnValue;
            },
            isInGroup: function(value: any, groupName: string): boolean {
                if (value == null || groupName == null) {
                    return false;
                }
                if(!Array.isArray(value)) {
                    return value.toString() === groupName;
                }
                for(let x=0;x<value.length;++x) {
                    if(this.isInGroup(value[x], groupName)) {
                        return true;
                    }
                }
                return false;
            },
            rowClicked: function (entry: any) {
                for (let x = 0; x < this.internalColumns.length; ++x) {
                    let internalColumn: ColumnData = this.internalColumns[x];
                    if (!internalColumn.filter || internalColumn.filter.value === undefined) {
                        continue;
                    }
                    internalColumn.saveFilter(this.databaseSettings);
                }
                this.$emit("row-clicked", { entry: entry });
            },
            setPage: function (currentPage: Number) {
                if (currentPage > this.finalPage)
                    this.page = this.finalPage;
                else if (currentPage < 1)
                    this.page = 1;
                else
                    this.page = currentPage;
                this.$emit("pagechange", { page: this.page, filter: this.filterKey, sort: this.sortKey, direction: this.internalColumns[this.sortKey].sortDirection });
            },
            sort: function(data: Array<any>, columns: Array<any>, sortKey: number) {
                // Sort the results
                if(!this.sortable){
                    return data;
                }

                let tempSortKey = this.sortKey;
                // Sort each column that are default sorts
                for (let x = 0; x < columns.length; ++x) {
                    let internalColumn = columns[x];
                    if (!internalColumn.sort) {
                        continue;
                    }
                    this.sortKey = x;
                    if (internalColumn.dataType === DataType.String) {
                        data = data.sort(this.sortString);
                    } else if (internalColumn.dataType === DataType.Number) {
                        data = data.sort(this.sortNumber);
                    } else if (internalColumn.dataType === DataType.Date) {
                        data = data.sort(this.sortDate);
                    }
                }
                this.sortKey = tempSortKey;
                if (sortKey === -1) {
                    return data;
                }
                // Sort by a column
                let sortedColumn = columns[sortKey];
                if (sortedColumn.dataType === DataType.String) {
                    data = data.sort(this.sortString);
                } else if (sortedColumn.dataType === DataType.Number) {
                    data = data.sort(this.sortNumber);
                } else if (sortedColumn.dataType === DataType.Date) {
                    data = data.sort(this.sortDate);
                }
                if (sortedColumn.sortDirection === 1) {
                    return data.reverse();
                }
                return data;
            },
            sortBy: function (column: any, index: number) {
                this.sortKey = index;
                column.sortDirection = column.sortDirection * -1;
                this.$emit("pagechange", { page: this.page, filter: this.filterKey, sort: this.sortKey, direction: column.sortDirection });
            },
            sortDate: function (val1: any, val2: any): number {
                let actualValue1 = (val1.columns[this.sortKey].data[0]?.value || "");
                let actualValue2 = (val2.columns[this.sortKey].data[0]?.value || "");
                return SortFuncs.sortDate(new Date(actualValue1), new Date(actualValue2));
            },
            sortNumber: function (val1: any, val2: any): number {
                let actualValue1 = (val1.columns[this.sortKey].data[0]?.value || "").toString().toNumber();
                let actualValue2 = (val2.columns[this.sortKey].data[0]?.value || "").toString().toNumber();
                return SortFuncs.sortNumber(actualValue1, actualValue2);
            },
            sortString: function (val1: any, val2: any): number {
                let actualValue1 = val1.columns[this.sortKey].data[0]?.value || "";
                let actualValue2 = val2.columns[this.sortKey].data[0]?.value || "";
                return SortFuncs.sortString(actualValue1, actualValue2);
            },
        },
        props: {
            columns: {
                default: [], type: Array
            },
            data: {
                default: [], type: Array
            },
            groupBy: {
                default: "", type: String
            },
            page: {
                default: 1, type: Number
            },
            paged: {
                default: false, type: Boolean
            },
            pageSize: {
                default: -1, type: Number
            },
            total: {
                default: 0, type: Number
            },
            saveFilters: {
                default: true, type: Boolean
            },
            searchable: {
                default: true, type: Boolean
            },
            showCount: {
                default: true, type: Boolean
            },
            sortable: {
                default: true, type: Boolean
            },
            quickNav: {
                default: false, type: Boolean
            },
            filterValue: {
                default: "", type: String
            }
        }
    });
</script>