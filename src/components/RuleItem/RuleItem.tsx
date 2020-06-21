import {useState} from "react";
import React from "react";
import Select from "react-select";
import { IOperation, Operations, OperationType } from "../modules/Operations";
import { IField, FieldConfig, FieldOption, FieldValueType } from "../modules/FieldConfig";
import { ValueType, FieldValue } from "../FieldValue/FieldValue";

export interface IRule {
    properties: {
        type: "rule"
    };
    field: IField;
    operation: IOperation;
    value: ValueType[];
}

interface RuleProps {
    itemConfig: IRule
}
export const RuleItem = (props: RuleProps) => {
    const [rule, setRule] = useState(props.itemConfig);
    const [field, setField] = useState(rule.field);
    const [operation, setOperation] = useState(rule.operation);
    const [value, setValue] = useState(rule.value);

    const getOperations = (field: IField) => {
        let operations: IOperation[] = [];
        
        // Check if limited operators
        if(field.operators && field.operators.length) {
            field.operators.forEach(key => {
                operations.push(Operations[key]);
            });
        }

        if(operations.length === 0) {
            let arrKeys = Object.keys(Operations) as OperationType[];
            
            if(field.valueType === "boolean") {
                arrKeys = ["equals", "notEqual"];
            } else {
                arrKeys.forEach(key => {
                    // Allow between only in case of field is of number type
                    if(key === "between" && field.valueType === "number") {
                        operations.push(Operations[key]);
                    } else {
                        operations.push(Operations[key]);
                    }
                });   
            }
        }
        return operations;
    }
    
    const getFields = () => {
        let fields: IField[] = [];
        for(const item in FieldConfig) {
            fields.push(FieldConfig[item]);
        }
        return fields;
    };

    const fieldChange = (selected: FieldOption) => {
        if(selected) {
            setField(FieldConfig[selected.value])
        }
    }
    const operationChange = (selected: IOperation) => {
        if(selected) {
            setOperation(Operations[selected.value as OperationType]);
        }
    }
    
    return (
      <div className={"ruleItem"}>
          Field:
          <Select 
                options={getFields()} 
                onChange={(selected) =>fieldChange(selected as FieldOption)} />
          Operation:
            {
                field && (
                    <Select
                    options={getOperations(field)} 
                    onChange={(selected) =>operationChange(selected as IOperation)} />
                )
            }
            Value:
            {
                <FieldValue value={value}
                    field={field}
                    operation={operation}
                    onChange={setValue} />
            }
      </div>
    );
  }