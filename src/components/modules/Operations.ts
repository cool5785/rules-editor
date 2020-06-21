export type OperationType = "equals" | "notEqual"| "lessThan" | "greaterThan" | "lessThanEqual" | "greaterThanEqual" | "between" | "in";

export interface IOperation {
    sqlValue: string;
    value: OperationType;
    label: string;
}
export const Operations: { [key in OperationType]: IOperation } = {
    "equals": {
        value: "equals",
        sqlValue: "=",
        label: "Equals to"
    },
    "notEqual": {
        value: "notEqual",
        sqlValue: "!=",
        label: "Not Equal to"
    },
    "lessThan": {
        value: "lessThan",
        sqlValue: "<",
        label: "Less than"
    },
    "greaterThan": {
        value: "greaterThan",
        sqlValue: ">",
        label: "Greater than"
    },
    "lessThanEqual": {
        value: "lessThanEqual",
        sqlValue: "<=",
        label: "Less than or Equals to"
    },
    "greaterThanEqual": {
        value: "greaterThanEqual",
        sqlValue: ">=",
        label: "Greater than or Equals to"
    },
    "between": {
        value: "between",
        sqlValue: "BETWEEN",
        label: "Between"
    },
    "in": {
        value: "in",
        sqlValue: "IN",
        label: "Includes"
    }
};