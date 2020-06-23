import { IField } from "../modules/FieldConfig";
import { IOperation } from "../modules/Operations";
import { ValueType } from "./FieldValue";
import { useState, useEffect } from "react";
import React from "react";

interface BetweenProps {
    field: IField;
    operation: IOperation;
    value: ValueType[];
    onChange: (val: ValueType[]) => void; 
}
export const InputBetween = (props: BetweenProps) => {
    const [a, b] = props.value;
    const [valueA, setValueA] = useState(a);
    const [valueB, setValueB] = useState(b);
    const fieldSettings = props.field.fieldSettings;
    const onChange = props.onChange;

    const parseNumber = (val: string) => {
        return val ? Number(val): val;
    };

    useEffect(()=> {
        console.log("between %d and %d", valueA, valueB);
        onChange([valueA, valueB]);
    }, [valueA, valueB, onChange]);

    return (
        <div className="betweenValue">
            <input type="number"
                value={valueA?.toString()}
                max={fieldSettings?.max}
                min={fieldSettings?.min}
                onChange={(evt)=> setValueA(parseNumber(evt.target.value))}/>
            AND
            <input type="number" 
                value={valueB?.toString() || ""}
                max={fieldSettings?.max}
                min={fieldSettings?.min}
                onChange={(evt)=> setValueB(parseNumber(evt.target.value))}/>
        </div>
    );
};