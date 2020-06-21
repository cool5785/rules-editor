import {useState} from "react";
import React from "react";
import Select from "react-select";
import { IOperation, Operations, OperationType } from "../modules/Operations";
import { IField, FieldConfig, FieldOption, FieldValueType } from "../modules/FieldConfig";
import { ButtonBar } from "../common";
type ValueType = string | number | boolean;
interface IRule {
    properties: {
        type: "rule"
    };
    field: IField;
    operation: IOperation;
    value: ValueType[];
}

interface IGroup {
    properties: {
        type: "group";
        condition: "NOT" |"AND" | "OR" 
    };
    children: (IGroup | IRule)[];
}

interface FieldValueProp {
    field: IField;
    operation: IOperation;
    value: ValueType[];
    onChange: (val: ValueType[]) => void;
}
export const FieldValue = (props: FieldValueProp) => {
    const {
        valueType
        , fieldSettings
    }= props.field;
    const operationVal = props.operation.value;
    // const [value1, setValue] = useState(undefined);

    // const getInput = (valueType: FieldValueType) => {
    //     return (<>
    //         {valueType === "number" 
    //             && <input type="number" 
    //                 max={fieldSettings?.max}
    //                 min={fieldSettings?.min}
    //                 onChange={(evt)=> setValue(evt.target.value)}/>
    //         }
    //         {valueType === "text"
    //             && <input type="text"
    //                 onChange={(evt)=> setValue(evt.target.value)}/>
    //         }
    //         {valueType === "boolean"
    //             && <ButtonBar labels={["True", "False"] } />
    //         }
    //     </>);
    // };

    if(operationVal === "between") {
        const [a, b] = props.value;
        // return 2 components
        return (<>
            {valueType === "number" 
                && <input type="number" 
                    value={a.toString()}
                    max={fieldSettings?.max}
                    min={fieldSettings?.min}
                    onChange={(evt)=> setValue(evt.target.value)}/>
            }
            {valueType === "text"
                && <input type="text"
                    onChange={(evt)=> setValue(evt.target.value)}/>
            }
        </>);
    } else if(operationVal === "in") {
        // return select box
    } else {
        // return single item of field type
        
    }
    return (<div className={"fieldValue"}>
        {
            operationVal === "between" && (<>
                
            </>)
        }
    </div>);
};

interface RuleProps {
    itemConfig: IRule
}
export const RuleItem = (props: RuleProps) => {
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
                
            }
      </div>
    );
  }