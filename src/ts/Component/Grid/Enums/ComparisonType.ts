// The comparison type used when filtering
export enum ComparisonType {
    // The value starts with the filter value
    StartsWith,
    // The value contains the filter value
    Contains,
    // The value ends with the filter value
    EndsWith,
    // The value equals the filter value
    Equals,
    // The date/number is greater than the filter value
    After,
    // The date/number is greater than or equal the filter value
    AfterOrEqual,
    // The date/number is less than the filter value
    Before,
    // The date/number is less than or equal the filter value
    BeforeOrEqual
}