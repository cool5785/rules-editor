import { IField, IOperation } from "../modules";
import React from "react";
import { InputBetween } from "./InputBetween";

export type ValueType = string | number | boolean;

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
        return (<InputBetween {...props}/>);
    } else if(operationVal === "in") {
        // return select box
    } else {
        // return single item of field type
        
    }
    return (<div className={"fieldValue"}>
        
    </div>);
};