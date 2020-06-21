// import {useState} from "react";
import React from "react";
// import {  } from "./common";
import {Button, ButtonBar } from "./common";
import { IRule } from "./RuleItem/RuleItem";

interface IGroup {
  properties: {
      type: "group";
      condition: "NOT" |"AND" | "OR" 
  };
  children: (IGroup | IRule)[];
}


interface Props {

}

export const Group = (props: Props) => {
    // const [age, setAge] = useState(19)
  
    return (
      <div>
          <Button
            label={"My Button Test"}
            theme="aqua"
            onClick={()=> { console.log("Button is clicked")}} />
            <ButtonBar
                labels={["NOT","AND", "OR"]}
                onChange={(i)=> {
                    console.log("you have selected", i); 
                }}
            ></ButtonBar>
      </div>
    )
  }