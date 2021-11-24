import ColumnData from "./ColumnData";
import Entry from "./Entry";

// Parsed column value for a row
export default class RowValue {
    //Constructor
    public constructor(column: ColumnData, data: any) {
        this.column = column;
        this.data = this.getItems(data, column);
    }
    // Column for the row.
    column: ColumnData;
    // The individual entries for this value.
    data: Array<Entry>;

    
    // Gets the entries for a cell in the table.
    private getItems(row: any, column: ColumnData): Array<Entry>  {
        let parents = this.getParentProperties(row, column.property);
        let finalValues: Array<Entry> = [];
        for(let x = 0; x < parents.length; ++x) {
            let parent = parents[x];
            finalValues.push(new Entry(parent, column));
        }
        return finalValues;
    }

    // Gets the parent properties for a column.
    private getParentProperties(value: any, property: string): Array<Entry> {
        if(!property) {
            return [];
        }
        let properties = property.split('.');
        let propertyName = properties[0];
        let finalProperty = value[propertyName];
        if(properties.length === 1) {
            if(Array.isArray(value)) {
                return value;
            }
            return [value];
        }
        let nextProperties = properties.slice(1, properties.length).join(".");
        if(Array.isArray(finalProperty)) {
            let returnValues: Array<any> = [];
            for (let y = 0; y < finalProperty.length; ++y) {
                returnValues = returnValues.concat(this.getParentProperties(finalProperty[y], nextProperties));
            }
            return returnValues;
        }
        return this.getParentProperties(finalProperty, nextProperties);
    }
}