import { IField } from "../modules/FieldConfig";
import { IOperation } from "../modules/Operations";
import { ValueType } from "./FieldValue";
import { useState, useEffect } from "react";
import React from "react";

interface InProps {
    field: IField;
    operation: IOperation;
    value: ValueType[];
    onChange: (val: ValueType[]) => void; 
}
export const InputIn = (props: InProps) => {
    // const [a] = props.value;
    const listValues = props.field.listValues;
    const fieldSettings = props.field.fieldSettings;

    // useEffect(()=> {
    //     console.log("between %d and %d", valueA, valueB);
    //     props.onChange([valueA, valueB]);
    // }, [valueA, valueB]);

    // return (
    //     <div className="betweenValue">
    //         <input type="number"
    //             value={valueA.toString()}
    //             max={fieldSettings?.max}
    //             min={fieldSettings?.min}
    //             onChange={(evt)=> setValueA(parseNumber(evt.target.value))}/>
    //         AND
    //         <input type="number" 
    //             value={valueB.toString()}
    //             max={fieldSettings?.max}
    //             min={fieldSettings?.min}
    //             onChange={(evt)=> setValueB(parseNumber(evt.target.value))}/>
    //     </div>
    // );
};