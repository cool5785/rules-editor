// import {useState} from "react";
import React from "react";
// import {  } from "./common";
import {Button, ButtonBar } from "./common";
import { IRule } from "./RuleItem/RuleItem";

interface IGroup {
  properties: {
    type: "group";
    condition: "NOT" | "AND" | "OR" 
  };
  children: (IGroup | IRule)[];
}

interface Props {

}

export const GroupItem = (props: Props) => {
  return (
    <div className={"groupItem"}>
        <Button
          label={"Add Group"}
          theme="aqua"
          onClick={()=> { console.log("Add a Group")}}/>
        <Button
          label={"Add Rule"}
          theme="aqua"
          onClick={()=> { console.log("Add a Rule")}}/>  
          <ButtonBar
              labels={["NOT","AND", "OR"]}
              onChange={(i)=> {
                  console.log("you have selected", i); 
              }}
          ></ButtonBar>
    </div>
  )
}