<template>
    <div v-cloak class="clarity-grid">
        <div class="panel">
            <div class="body">
                <div class="right do-not-print flex column" v-if="searchable">
                    <table class="no-border">
                        <tbody>
                            <tr>
                                <td>
                                    Search:
                                </td>
                                <td>
                                    <input type="text" placeholder="Filter Entries" v-model="filterKey" @keyup="filterChanged" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Export:
                                </td>
                                <td>
                                    <a href="#!" class="fas fa-file-csv" @click="exportData('CSV')" v-if="exportInfo.exportable"></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
                <div class="quick-nav do-not-print" v-if="quickNav && filteredGroups">
                    <ul class="inline">
                        <li>Quick nav:</li>
                        <li v-for="group in filteredGroups" :key="group">
                            <a :href="'#'+group">{{group}}</a>
                        </li>
                    </ul>
                </div>
                <br class="clear" />
            </div>
        </div>
        <table class="sortable" id="filteredTable">
            <thead>
                <tr>
                    <th v-for="(column, index) in internalColumns" v-bind:key="column"
                        @click="sortBy(column, index)"
                        :class="{ active: sortKey == index,headerSortUp: sortKey==index && column.sortDirection > 0,headerSortDown: sortKey == index && column.sortDirection < 0 }"
                        :columnName="column.property">
                        {{ $filters.capitalize(column.display) }}
                        <div v-if="column.filter.filtered">
                            <div v-if="column.filter.type == 1" class="do-not-print">
                                <input :type="column.filter.type" :placeholder="column.filter.placeholder" v-model="column.filter.value" :list="column.property" @click.stop.prevent @keyup="filterChanged" />
                                <datalist :id="column.property">
                                    <option v-for="value in getDistinctValues(column)" :key="value">{{value}}</option>
                                </datalist>
                            </div>
                            <div v-if="column.filter.type == 0" class="do-not-print">
                                <select v-model="column.filter.value" @click.stop.prevent @change="filterChanged">
                                    <option v-for="value in getDistinctValues(column)" :key="value">{{value}}</option>
                                </select>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody v-for="group in filteredGroups" v-bind:key="group">
                <tr v-if="group!==''" class="grid-group-header"><td :colspan="internalColumns.length"><a :id="group"></a>{{ group }}</td></tr>
                <tr v-for="(entry, index) in getEntriesInGroup(group)" v-bind:key="index" @click="rowClicked(entry)">
                    <td v-for="column in entry.columns" v-bind:key="column" :class="entry.style">
                        <div v-for="item in column.data" :key="item">
                            <div v-html="item.value" v-if="!item.url"></div>
                            <a v-html="item.value" v-if="item.url" :href="item.url"></a>
                        </div>
                    </td>
                </tr>
                <tr v-if="anySum" class="grid-group-footer"><td :colspan="internalColumns.length">Totals:</td></tr>
                <tr v-if="anySum" class="grid-group-footer">
                    <td v-for="key in internalColumns" v-html="sumColumn(group, key)" v-bind:key="key">
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="pageable" class="do-not-print">
                <tr>
                    <td :colspan="internalColumns.length">
                        <div class="right">Page {{ page }} of {{ finalPage }}</div>
                        <ul class="paged">
                            <li class="cursor-pointer fas fa-fast-backward text-center" @click="setPage(1)" v-bind:class="{ 'disabled': (page==1) }"></li>
                            <li class="cursor-pointer fas fa-step-backward text-center" @click="setPage(page-1)" v-bind:class="{ 'disabled': (page==1) }"></li>
                            <li class="cursor-pointer text-center" v-for="n in (endPage-startPage)" @click="setPage(startPage+n)" v-bind:class="{ 'active': (page==(startPage+n)) }" :key="n">{{ startPage+n }}</li>
                            <li class="cursor-pointer fas fa-step-forward text-center" @click="setPage(page+1)" v-bind:class="{ 'disabled': (page==finalPage) }"></li>
                            <li class="cursor-pointer fas fa-fast-forward text-center" @click="setPage(finalPage)" v-bind:class="{ 'disabled': (page==finalPage) }"></li>
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
    import Vue from 'vue';
    import ColumnData from "./ColumnData";
    import DatabaseSettings from './DatabaseSettings';
    import RowData from "./RowData";
    import SortFuncs from "../../Framework/Utils/SortFuncs";
    import { Grid } from './Enums';
    import RowValue from './RowValue';
    import Entry from './Entry';
    import { Downloader, FileTypes } from '../../Framework/IO/Downloader';
    import { BrowserUtils } from '../../Framework/Browser/BrowserUtils';

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
            anySum: function (): boolean {
                return this.internalColumns.some((item: any) => {
                    return item.sum;
                });
            },
            endPage: function (): number {
                let tempPage = (Math.floor((this.page - 1) / 10) * 10) + 10;
                if (tempPage > this.finalPage)
                    return this.finalPage;
                return tempPage;
            },
            filteredGroups: function() {
                if(!this.groupBy) return [""];
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
            filteredData: function (): Array<RowData> {
                let data = this.filter(this.internalData, this.filterKey?.toLowerCase());
                return this.sort(data, this.internalColumns, this.sortKey);
            },
            finalPage: function (): number {
                if (this.pageSize === -1) {
                    return 1;
                }
                return Math.ceil(this.total / this.pageSize);
            },
            pageable: function (): boolean {
                return this.paged && this.pageSize > 0 && this.filteredData.length > this.pageSize;
            },
            startPage: function (): number {
                return (Math.floor((this.page - 1) / 10) * 10);
            },
        },
        data: function () {
            let that = this;
            let databaseSettings = new DatabaseSettings(this.saveFilters);
            let internalColumns = that.getColumnInfos(this.columns, this.data, databaseSettings);
            let sortMethods = [];
            sortMethods[Grid.ColumnDataType.String] = this.sortString;
            sortMethods[Grid.ColumnDataType.Number] = this.sortNumber;
            sortMethods[Grid.ColumnDataType.Date] = this.sortDate;
            return {
                sortKey: -1,
                draggedColumn: null,
                internalColumns: internalColumns,
                databaseSettings: databaseSettings,
                filterKey: that.filterValue,
                internalData: that.getData(this.data, internalColumns),
                sortMethods: sortMethods
            };
        },
        methods: {
            exportData: function(type: string) {
                let returnValue: Array<any> = [];
                if(this.groupBy === "") {
                    let data: Array<RowData> = this.filteredData;
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
                        let data = this.getEntriesInGroup(group);
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
                Downloader.exportData(returnValue, this.columns, this.exportInfo.fileName + "." + type, FileTypes.CSV);
            },
            filter: function (data: Array<RowData>, filterKey: string): Array<RowData> {
                // Main filter
                if (filterKey && this.groupBy === "") {
                    data = data.filter((row: RowData) => row.columns.some((column: RowValue) => column.data.some((item: Entry) => item.value.toLowerCase().indexOf(filterKey) > -1)));
                }
                return data.filter((row: RowData) => row.columns.every((column: RowValue) => column.data.map((cell: Entry) => cell.value).some((cell: string) => column.column.passesFilter(cell))));
            },
            filterChanged: function() {
                this.$emit("data-updated", { data: this.filteredData });
            },
            getColumnInfos: function (columns: Array<ColumnData | String>, data: Array<any>, databaseSettings: DatabaseSettings): Array<ColumnData> {
                return columns.map(column => new ColumnData(column,data,databaseSettings));
            },
            getData: function (data: Array<any>, columns: Array<ColumnData>): Array<RowData> {
                return data.map(row => new RowData(row, columns));
            },
            getDistinctValues: function (column: any) {
                let returnValue = [''];
                let finalData: Array<RowData> = this.filteredData;
                for (let x = 0; x < finalData.length; ++x) {
                    let entries = finalData[x].columns
                                                .find((tempColumn: any) => tempColumn.column.property === column.property)
                                                ?.data
                                                .map((data: Entry) => data.value) || [];
                    for (let y = 0; y < entries.length; ++y) {
                        if(returnValue.indexOf(entries[y])===-1) {
                            returnValue.push(entries[y]);
                        }
                    }
                }
                return returnValue.sort(SortFuncs.sortString);
            },
            getEntriesInGroup: function(group: string): Array<RowData> {
                let data: Array<RowData> = this.filteredData;
                let that = this;
                if (that.groupBy === "") {
                    return data;
                }
                return data.filter(row => that.isInGroup(row.originalData[that.groupBy], group));
            },
            isInGroup: function(value: any, groupName: string): boolean {
                let that = this;
                if(Array.isArray(value)) {
                    return value.some(item => that.isInGroup(item, groupName));
                }
                return value?.toString() === groupName;
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
                    currentPage = this.finalPage;
                else if (currentPage < 1)
                    currentPage = 1;
                let sortedColumn: ColumnData = this.internalColumns[this.sortKey];
                let direction = sortedColumn?.sortDirection || 0;
                this.$emit("pagechange", { page: currentPage, filter: this.filterKey, sort: this.sortKey, direction: direction });
            },
            sort: function(data: Array<RowData>, columns: Array<ColumnData>, sortKey: number) {
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
                    data = data.sort(this.sortMethods[internalColumn.dataType]);
                }
                this.sortKey = tempSortKey;
                if (sortKey === -1) {
                    return data;
                }
                // Sort by a column
                let sortedColumn = columns[sortKey];
                data = data.sort(this.sortMethods[sortedColumn.dataType]);
                if (sortedColumn.sortDirection === 1) {
                    return data.reverse();
                }
                return data;
            },
            sortBy: function (column: ColumnData, index: number) {
                this.sortKey = index;
                column.sortDirection = column.sortDirection * -1;
                this.$emit("pagechange", { page: this.page, filter: this.filterKey, sort: this.sortKey, direction: column.sortDirection });
            },
            sortDate: function (val1: RowData, val2: RowData): number {
                let actualValue1 = (val1.columns[this.sortKey].data[0]?.value || "");
                let actualValue2 = (val2.columns[this.sortKey].data[0]?.value || "");
                return SortFuncs.sortDate(new Date(actualValue1), new Date(actualValue2));
            },
            sortNumber: function (val1: RowData, val2: RowData): number {
                let actualValue1 = (val1.columns[this.sortKey].data[0]?.value || "").toString().toNumber();
                let actualValue2 = (val2.columns[this.sortKey].data[0]?.value || "").toString().toNumber();
                return SortFuncs.sortNumber(actualValue1, actualValue2);
            },
            sortString: function (val1: RowData, val2: RowData): number {
                let actualValue1 = val1.columns[this.sortKey].data[0]?.value || "";
                let actualValue2 = val2.columns[this.sortKey].data[0]?.value || "";
                return SortFuncs.sortString(actualValue1, actualValue2);
            },
            sumColumn: function (groupName: string, column: ColumnData) {
                if (!column.sum) {
                    return "";
                }
                let data: Array<RowData> = this.getEntriesInGroup(groupName);
                return column.formatValue(data.map((row: RowData) => (<{[index: string]: any }>row.originalData)[column.property]?.toString().toNumber())
                                              .reduce((val1: number, val2: number) => val1 + val2));
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
            },
            exportInfo: {
                default: { exportable: true, fileName: BrowserUtils.Id }, type: Object
            }
        }
    });
</script>