import { OperationType } from "./Operations";

export interface FieldOption {
    label: string;
    value: string;
}
export type FieldComponentType = "input" | "select" | "multiselect" | "slider";
export type FieldValueType = "text" | "number" | "boolean";
export interface IField {
    label: string;
    value: string;
    componentType: FieldComponentType;
    valueType: FieldValueType;
    fieldSettings?: {
        /**
         * A function that returns true if current selected value is Valid for field
         */
        validate?:(value: any)=> boolean;
        errorMsg?: string;
        min?: number;
        max?: number;
    };
    /**
     * Specific set of allowed operations
     */
    operators?: OperationType[];
    listValues?: {label: string; value: string;}[]
}
export interface FieldConfigType {
    [key: string]: IField;
}
export const FieldConfig: FieldConfigType = {
    qty: {
        label: 'Qty',
        value: 'qty',
        valueType: "number",
        componentType: 'input',
        fieldSettings: {
            min: 0,
        },
    },
    price: {
        label: 'Price',
        value: 'price',
        valueType: "number",
        componentType: 'input',
        fieldSettings: {
            min: 10,
            max: 100,
        }
    },
    color: {
        label: 'Color',
        value: 'color',
        valueType: "text",
        componentType: 'select',
        listValues: [
          { value: 'yellow', label: 'Yellow' },
          { value: 'green', label: 'Green' },
          { value: 'orange', label: 'Orange' }
        ],
    },
    is_promotion: {
        label: 'Promo?',
        value: 'is_promotion',
        valueType: "boolean",
        componentType: 'input',
        operators: [],
    },
};
