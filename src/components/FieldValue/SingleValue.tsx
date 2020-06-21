import { IField } from "../modules/FieldConfig";
import { IOperation } from "../modules/Operations";
import { ValueType } from "./FieldValue";
import { useState, useEffect } from "react";
import React from "react";
import { ButtonBar } from "../common";

interface SingleValueProps {
    field: IField;
    operation: IOperation;
    value: ValueType[];
    onChange: (val: ValueType[]) => void; 
}
export const SingleValue = (props: SingleValueProps) => {
    const [selectedValue, setSelectedValue] = useState(props.value);
    const valueType = props.field.valueType;
    const fieldSettings = props.field.fieldSettings;

    useEffect(()=> {
        console.log("single value", selectedValue.toString());
        props.onChange(selectedValue);
    }, [selectedValue]);

    const onTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const val = evt.target.value;
        setSelectedValue(val ? [val] : []);
    };

    const onNumberChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const val = evt.target.value;
        setSelectedValue(val ? [val] : []);
    };

    const getBooleanFromVal = (vals: ValueType[]) => {
        const bools = ["true", "false"];
        const checked = vals && vals.length ? vals[0].toString().toLowerCase() : "false";
        return bools.indexOf(checked);
    };

    const onBooleanChange = (idx: number) => {
        const bools = [true, false];
        setSelectedValue([bools[idx]]);
    };

    return (
        <div className="singleValue">
            {
                valueType === "text" && <input type="text"
                    value={selectedValue.toString()}
                    onChange={onTextChange}/>
            }
            {
                valueType === "number" && <input type="number" 
                    max={fieldSettings?.max}
                    min={fieldSettings?.min}
                    onChange={onNumberChange}/>
            }
            {
                valueType === "boolean" && <ButtonBar labels={["True", "False"]}
                    checked={getBooleanFromVal(props.value)}
                    onChange={onBooleanChange} />
            }
        </div>
    );
};