export interface IOperation {
    value: string;
    label: string;
}
export type OperationType = "equals" | "notEqual"| "lessThan" | "greaterThan" | "lessThanEqual" | "greaterThanEqual" | "between" | "in";
export const Operations: { [key in OperationType]: IOperation } = {
    "equals": {
        value: "==",
        label: "Equals to"
    },
    "notEqual": {
        value: "!=",
        label: "Not Equal to"
    },
    "lessThan": {
        value: "<",
        label: "Less than"
    },
    "greaterThan": {
        value: ">",
        label: "Greater than"
    },
    "lessThanEqual": {
        value: "<=",
        label: "Less than or Equals to"
    },
    "greaterThanEqual": {
        value: ">=",
        label: "Greater than or Equals to"
    },
    "between": {
        value: "between",
        label: "Between"
    },
    "in": {
        value: "valuein",
        label: "Includes"
    }
};