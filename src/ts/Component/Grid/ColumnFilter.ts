import { Grid } from "./Enums"

// Column filtering info
export default class ColumnFilter {
    // the filter value
    value: string = "";
    // the comparison type
    comparison: Grid.ComparisonType = Grid.ComparisonType.Contains;
    // the filter type
    type: Grid.FilterType = Grid.FilterType.Textbox;
    // Whether or not filtering is turned on for the column
    filtered: boolean = false;
}