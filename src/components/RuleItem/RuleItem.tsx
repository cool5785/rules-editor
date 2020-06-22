import {useState, useEffect} from "react";
import React from "react";
import Select from "react-select";
import { IOperation, Operations, OperationType } from "../modules/Operations";
import { IField, FieldConfig, FieldOption, FieldValueType } from "../modules/FieldConfig";
import { ValueType, FieldValue } from "../FieldValue/FieldValue";
import { Button } from "../common";

export interface IRule {
    properties: {
        type: "rule"
    };
    field: string;
    operation: OperationType;
    value: ValueType[];
}

interface RuleProps {
    config: IRule;
    onRuleChange: (rule: IRule) => void;
    onRuleDelete: () => void;
}
export const RuleItem = (props: RuleProps) => {
    // convert string field name to Field Object to avoid storing whole setting with every rule
    const ruleField = FieldConfig[props.config.field];
    const operationObj = Operations[props.config.operation];

    const [rule, setRule] = useState(props.config);
    const [field, setField] = useState(ruleField);
    const [operation, setOperation] = useState(operationObj);
    const [value, setValue] = useState(rule.value);

    useEffect(()=>{
        // Rule updated
        let ruleObj = props.config;
        ruleObj.field = field.value;
        ruleObj.operation = operation.value;
        ruleObj.value = value;

        setRule(ruleObj);
        // Tell parent about ruleChange
        props.onRuleChange(ruleObj);
    }, [field, operation, value]);

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
            <Button label={"🗑"} 
                onClick={props.onRuleDelete}
                tooltip={{position: "bottom" ,text: "Delete Rule"}} />
        Field:
            <Select 
                value={field}
                options={getFields()} 
                onChange={(selected) =>fieldChange(selected as FieldOption)} />
        Operation:
            {field && (
                <Select
                value={operation}
                options={getOperations(field)} 
                onChange={(selected) =>operationChange(selected as IOperation)} />
            )}
        Value:
            <FieldValue value={value}
                field={field}
                operation={operation}
                onChange={setValue} />
      </div>
    );
}