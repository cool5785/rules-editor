import {useState} from "react";
import React from "react";
import Select from "react-select";
import { IOperation, Operations, OperationType } from "../modules/Operations";

type FieldType = "text" | "number" | "boolean" | "select" | "multiselect";
interface IField {
    label: string;
    type: FieldType;
    fieldSettings?: {
        /**
         * A function that returns true if current selected value is Valid for field
         */
        validate?:(value: any)=> boolean;
        min?: number;
        max?: number;
    };
    /**
     * Specific set of allowed operations
     */
    operators?: OperationType[];
    listValues?: {label: string; value: string;}[]
}

interface IRule {
    properties: {
        type: "rule"
    };
    field: IField;
    operation: IOperation;
    value: (string|number|boolean)[];
}

interface IGroup {
    properties: {
        type: "group";
        condition: "NOT" |"AND" | "OR" 
    };
    children: (IGroup | IRule)[];
}



const FieldConfig: {[key: string]: IField} = {
    qty: {
        label: 'Qty',
        type: 'number',
        fieldSettings: {
            min: 0,
        },
    },
    price: {
        label: 'Price',
        type: 'number',
        fieldSettings: {
            min: 10,
            max: 100,
        }
    },
    color: {
        label: 'Color',
        type: 'select',
        listValues: [
          { value: 'yellow', label: 'Yellow' },
          { value: 'green', label: 'Green' },
          { value: 'orange', label: 'Orange' }
        ],
    },
    is_promotion: {
        label: 'Promo?',
        type: 'boolean',
        operators: [],
    },
};

interface Props {
    itemConfig: IRule
}
export const RuleItem = (props: Props) => {
    const [rule, setRule] = useState(props.itemConfig);
    const [field, setField] = useState(rule.field);
    const [operation, setOperation] = useState(rule.operation);
    const [value, setValue] = useState(rule.value);

    const updateField = () => {

    };

    const updateOperation = () => {

    };

    const updateValue = () => {

    };

    const getOperations = (field: IField) => {
        let operations: IOperation[] = [];
        
        // Check if limited operators
        if(field.operators && field.operators.length) {
            field.operators.forEach(key => {
                operations.push(Operations[key]);
            });
        }

        if(operations.length === 0) {
            const arrKeys = Object.keys(Operations) as OperationType[];
            arrKeys.forEach(key => {
                operations.push(Operations[key]);
            });
        }

        return operations;
    }

    const getValueComponent = (field: IField) => {

    }

    return (
      <div className={"ruleItem"}>
          Field:
          <Select options={} />
          Operation:
          {field && <Select options={getOperations(field)} onChange={} />}
      </div>
    );
  }