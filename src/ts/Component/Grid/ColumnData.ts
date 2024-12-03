import moment from "moment";
import { DatabaseConnection } from "../../Framework/Database/Database";
import ColumnFilter from "./ColumnFilter";
import DatabaseSettings from "./DatabaseSettings";
import { Grid } from "./Enums";
import "../../Extensions/String";

// Column information
export default class ColumnData {
    // Constructor
    public constructor(source?: ColumnData | String, data?: Array<any>, databaseSettings?: DatabaseSettings) {
        if (source == null || data == null) {
            return;
        }
        if(databaseSettings == null) {
            databaseSettings = new DatabaseSettings();
        }
        if (typeof source === "string") {
            let tempSource= new ColumnData();
            tempSource.property = source.replace(ColumnData.MultipleSpacesRegex, "").trim();
            tempSource.display = ColumnData.fixHeader(source);
            tempSource.dataType = ColumnData.guessDataType(source, data);
            source = tempSource;
        }
        if ("property" in source) {
            this.property = source.property.replace(ColumnData.MultipleSpacesRegex, "").trim();
        }
        let propertiesToCopy = [
            { name: 'display', default: (column: ColumnData) => ColumnData.fixHeader(column.property) },
            { name: 'property', default: (column: ColumnData) => column.display.replace(ColumnData.MultipleSpacesRegex, "").trim() },
            { name: 'dataType', default: (column: ColumnData) => ColumnData.guessDataType(column.property, data) },
            { name: 'sum', default: (column: ColumnData) => false },
            { name: 'locales', default: (column: ColumnData) => "en-US" },
            { name: 'format', default: (column: ColumnData) => { return {}; } },
            { name: 'url', default: (column: ColumnData) => "" },
            { name: 'filter', default: (column: ColumnData): any => new ColumnFilter() },
            { name: 'sort', default: (column: ColumnData) => false },
            { name: 'sortDirection', default: (column:ColumnData) => 1 },
            { name: 'default', default: (column: ColumnData): any => "" },
            { name: 'show', default: (column: ColumnData): any => false }
        ];
        for (let x = 0; x < propertiesToCopy.length; ++x) {
            let property = propertiesToCopy[x];
            if(source.hasOwnProperty(property.name)) {
                (<{[index: string]: any}>this)[property.name] = (<{[index: string]: any}>source)[property.name];
            } else {
                (<{[index: string]: any}>this)[property.name] = property.default(this);
            }
        }
        if ("filter" in source) {
            let propertiesToCopy = [
                { name: 'value', default: (column: ColumnFilter) => "" },
                { name: 'comparison', default: (column: ColumnFilter) => Grid.ComparisonType.Contains },
                { name: 'type', default: (column: ColumnFilter) => Grid.FilterType.Textbox },
                { name: 'filtered', default: (column: ColumnFilter) => false }
            ];
            for (let x = 0; x < propertiesToCopy.length; ++x) {
                let property = propertiesToCopy[x];
                if(source.filter.hasOwnProperty(property.name)) {
                    (<{[index: string]: any}>this.filter)[property.name] = (<{[index: string]: any}>source.filter)[property.name];
                } else {
                    (<{[index: string]: any}>this.filter)[property.name] = property.default(this.filter);
                }
            }
            ColumnData.returnValueFromDB(this.property, databaseSettings, (data : string) => this.filter.value = data);
        }
    }

    // The display value for the header
    display: string = "";
    // The property of the data object to show in the column
    property: string;
    // Data type (string, number, image, etc.)
    dataType: Grid.ColumnDataType = Grid.ColumnDataType.String;
    // Should the value be summed?
    sum: boolean = false;
    // locale for formatting purposes
    locales: string = "en-US";
    // Number or DateTime format options (Intl.NumberFormatOptions or Intl.DateTimeFormatOptions).
    format: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;
    // url format used for the column ("/myUrl/{property1}/{property2.subproperty}")
    url: string = "";
    // The filtering information
    filter: ColumnFilter = new ColumnFilter();
    // Whether the column should be sorted by default.
    sort: boolean = false;
    // Sort direction
    sortDirection: number = 1;
    // Default value for the column
    default: any = "";
    // Whether the column should be displayed or not
    show: boolean = true;

    // Save the filter's data.
    public saveFilter(databaseSettings: DatabaseSettings): void {
        ColumnData.saveValueToDB(this.filter.value, this.property, databaseSettings);
    }

    // Formats a value based on the column's settings
    public formatValue(value: any): string {
        if(value == null || value === "") {
            value = this.default;
        }
        if (value === "") {
            return value;
        }
        if (this.dataType === Grid.ColumnDataType.String) {
            return value?.toString().replace(/\n/gi,"<br />") || "";
        }
        let valueType = typeof value;
        if (this.dataType === Grid.ColumnDataType.Number) {
            if (valueType === "number") {
                return new Intl.NumberFormat(this.locales, this.format).format(value);
            }
            if (valueType === "string") {
                return new Intl.NumberFormat(this.locales, this.format).format(ColumnData.getNumber(value.stripHTML()));
            }
        } else if (this.dataType === Grid.ColumnDataType.Date) {
            if (valueType === "number") {
                return new Intl.DateTimeFormat(this.locales, <Intl.DateTimeFormatOptions>this.format).format(value);
            }
            if (valueType === "string") {
                value = value.stripHTML();
                if(moment(value).year() === 1900){
                    return "";
                }
                return new Intl.DateTimeFormat(this.locales, <Intl.DateTimeFormatOptions> this.format).format(Date.parse(value));
            }
        } else if (this.dataType === Grid.ColumnDataType.Link) {
            value = value.stripHTML();
            return "<a href='" + value + "'>" + value + "</a>";
        } else if (this.dataType === Grid.ColumnDataType.Image) {
            value = value.stripHTML();
            return "<img src='" + value + "' alt='" + value + "'" + (this.default?" onerror='this.src=\""+this.default+"\"'":"") + " />";
        }
        return value;
    }

    // Determines if a specific cell data passes the column's filter.
    public passesFilter(cellData: string): boolean {
        var filterString = (this.filter.value || "").toLowerCase();
        if(filterString === "") {
            return true;
        }
        if(cellData === "") {
            return false;
        }
        cellData = cellData.toLowerCase();
        if(this.dataType === Grid.ColumnDataType.Date) {
            let momentEntry = moment(cellData);
            let filterValue = moment(filterString);
            if (this.filter.comparison === Grid.ComparisonType.After) {
                return momentEntry.isAfter(filterValue);
            } else if (this.filter.comparison === Grid.ComparisonType.AfterOrEqual) {
                return momentEntry.isSameOrAfter(filterValue);
            } else if (this.filter.comparison === Grid.ComparisonType.BeforeOrEqual) {
                return momentEntry.isSameOrBefore(filterValue);
            } else if (this.filter.comparison === Grid.ComparisonType.Before) {
                return momentEntry.isBefore(filterValue);
            }
            return momentEntry.isSame(filterValue);
        }
        if (this.filter.comparison === Grid.ComparisonType.After) {
            return cellData > filterString;
        } else if (this.filter.comparison === Grid.ComparisonType.AfterOrEqual) {
            return cellData >= filterString;
        } else if (this.filter.comparison === Grid.ComparisonType.BeforeOrEqual) {
            return cellData <= filterString;
        } else if (this.filter.comparison === Grid.ComparisonType.Before) {
            return cellData < filterString;
        } else if (this.filter.comparison === Grid.ComparisonType.Contains) {
            return cellData.indexOf(filterString) > -1;
        } else if (this.filter.comparison === Grid.ComparisonType.EndsWith) {
            return cellData.endsWith(filterString);
        } else if (this.filter.comparison === Grid.ComparisonType.StartsWith) {
            return cellData.startsWith(filterString);
        } else if (this.filter.comparison === Grid.ComparisonType.Equals) {
            return cellData === filterString;
        }
        return true;
    }

    // Date Regex
    private static dateRegex: RegExp = /^((\d\d)?\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)(T\d\d:\d\d:\d\dZ?)?$/ig;
    // Number Regex
    private static numberRegex: RegExp = /^-?[£$¤]?[\d,.]+%?$/;
    // Phone Regex
    private static phoneRegex: RegExp = /^\d\d\d.\d\d\d.\d\d\d\d$/;
    // URL Regex
    private static urlRegex: RegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    // Image Regex
    private static imageRegex: RegExp =/^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/;
    // Is Whitespace Regex
    private static isWhiteSpaceRegex: RegExp = /^\s+|\s+$/g
    // Multiple spaces Regex
    private static MultipleSpacesRegex: RegExp = /\s+/g;
    
    // Sets the default header value if one isn't supplied.
    private static fixHeader (column: string): string {
        return column.replace("_", " ").replace("-", " ").replace(/([a-z])([A-Z])/g, "$1 $2");
    }

    // Gets a number from a value
    private static getNumber (value: string): number {
        if (!value) {
            return 0;
        }
        return parseFloat(value.toString().replace(/[^0-9.-]/g, ""));
    }

    // Guesses the data type for the column
    private static guessDataType (column: string, data: Array<any>): Grid.ColumnDataType {
        let tempDiv = document.createElement("div");
        for (let x = 0; x < data.length; ++x) {
            if (!(column in data[x])) {
                continue;
            }
            let cellText = data[x][column].toString();
            tempDiv.innerHTML = cellText;
            cellText = (tempDiv.textContent || tempDiv.innerText || "").replace(this.isWhiteSpaceRegex, "");
            if (cellText === "") {
                continue;
            }
            if (cellText.match(this.imageRegex)) {
                return Grid.ColumnDataType.Image;
            }
            if (cellText.match(this.urlRegex)) {
                return Grid.ColumnDataType.Link;
            }
            if (cellText.match(this.numberRegex) && !cellText.match(this.phoneRegex)) {
                return Grid.ColumnDataType.Number;
            }
            if (cellText.match(this.dateRegex)) {
                return Grid.ColumnDataType.Date;
            }
        }
        return Grid.ColumnDataType.String;
    }

    // Gets a value from the database/cache
    private static returnValueFromDB(dataKey: string, databaseSettings: DatabaseSettings, callback: (response: any) => any): void {
        if(!databaseSettings.saveFilters) {
            return;
        }
        new DatabaseConnection(databaseSettings.sourceName, ["cache", "cacheExpirations"], 1)
            .openDatabase(database => {
                database.getByKey("cache", dataKey, event => {
                    let result = (<any>event.target).result;
                    if (result === undefined) {
                        return;
                    }
                    callback(result);
                });
            });
    }
    
    // Saves a value to the database/cache
    private static saveValueToDB (data: string, dataKey: string, databaseSettings: DatabaseSettings): void {
        if(!databaseSettings.saveFilters) {
            return;
        }
        new DatabaseConnection(databaseSettings.sourceName, ["cache", "cacheExpirations"], 1)
            .openDatabase(database => {
                if (data === undefined) {
                    return;
                }
                database.add("cache", data, dataKey);
                database.add("cacheExpirations", Date.now(), dataKey);
            });
    }
}