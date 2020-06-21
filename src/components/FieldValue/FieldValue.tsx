import { IField, IOperation } from "../modules";
import React from "react";
import { InputBetween } from "./InputBetween";
import { InputIn } from "./InputIn";
import { SingleValue } from "./SingleValue";

export type ValueType = string | number | boolean;

interface FieldValueProp {
    field: IField;
    operation: IOperation;
    value: ValueType[];
    onChange: (val: ValueType[]) => void;
}
export const FieldValue = (props: FieldValueProp) => {
    const operationVal = props.operation.value;

    return (<div className={"fieldValue"}>
        {operationVal == "between" && <InputBetween {...props}/>}
        {operationVal == "in" && <InputIn {...props}/>}
        {!(operationVal == "between" || operationVal == "in") && <SingleValue {...props}/>}
    </div>);
};