import { IField } from "../modules/FieldConfig";
import { IOperation } from "../modules/Operations";
import { ValueType } from "./FieldValue";
import { useState, useEffect } from "react";
import React from "react";
import Select from "react-select";

interface ValueOption {
    label: string;
    value: string;
}
interface InProps {
    field: IField;
    operation: IOperation;
    value: ValueType[];
    onChange: (val: ValueType[]) => void; 
}
export const InputIn = (props: InProps) => {
    const {value, field, onChange} = props;
    const listValues = field.listValues;
    const [selectedValue, setSelectedValue] = useState(value);

    useEffect(()=> {
        console.log("in ", selectedValue.toString());
        onChange(selectedValue);
    }, [selectedValue, onChange]);

    const textToValue = (val: string) => {
        const vals = val.split(",").map((d)=> d.trim());
        setSelectedValue(vals);
    };

    const getOptionsFromValue = (vals: ValueType[]) => {
        // convert to string for matching
        vals = vals.map(d => d.toString());
        let options: ValueOption[] = [];

        if(listValues) {
            listValues.forEach(d => {
                if(vals.indexOf(d.value.toString()) > -1) {
                    options.push(d);
                }
            });
        }

        return options.length ? options : null;
    };

    const optionToValue = (selected: ValueOption[]| null) => {
        let vals:string[] = [];
        if(selected) {
            vals = selected.map((d)=> d.value);
        }
        setSelectedValue(vals);
    };

    return (
        <div className="inValue">
            {
                listValues ?
                    <Select
                        isMulti={true}
                        value={getOptionsFromValue(props.value)}
                        options={listValues}
                        onChange={(selected) =>optionToValue(selected as ValueOption[])} />
                :   <input type="text"
                        value={selectedValue.toString()}
                        onChange={(evt)=> (textToValue(evt.target.value))}/>
            }
        </div>
    );
};