import React, { useState, useEffect } from "react";
import {Button, ButtonBar } from "./common";
import { IRule, RuleItem } from "./RuleItem/RuleItem";
import { FieldConfig } from "./modules/FieldConfig";
import "./Group.css";

type ConditionType = "NOT" | "AND" | "OR";

export interface IGroup {
  properties: {
    type: "group";
    condition: ConditionType;
  };
  children: (IGroup | IRule)[];
}

interface Props {
  config: IGroup;
  onGroupChange: (item: IGroup) => void;
  onGroupDelete: ()=> void;
}
export const GroupItem = (props: Props) => {
  const {config, onGroupChange} = props;
  const arrCondition: ConditionType[] = ["NOT" , "AND" , "OR"];

  const [group, setGroup] = useState(config);
  const [condition, setCondition] = useState(config.properties.condition);
  const [children, setChildren] = useState(config.children as (IGroup|IRule)[]);
  
  useEffect(()=> {
    onGroupChange(group);
  }, [group, onGroupChange]);

  useEffect(()=> {
    let groupObj: IGroup = {
      properties: {
        type: "group",
        condition: condition
      },
      children: children
    };
    setGroup(groupObj);
  }, [condition, children]);

  const updateChild = (idx: number, item:(IRule| IGroup)) => {
    let updatedChildren = children;
    updatedChildren[idx] = item;
    setChildren(updatedChildren);
  };

  const removeChild = (idx: number) => {
    let updatedChildren = children;
    updatedChildren.splice(idx, 1);
    setChildren(updatedChildren);
  };

  const getNewRule = (): IRule => {
    const FieldKeys = Object.keys(FieldConfig);
    let ruleConfig: IRule = {
      properties:{
        type: "rule"
      }
      , field: FieldKeys[0]
      , operation: "equals"
      , value:[]
    };
    return ruleConfig;
  };

  const addNewRule = () => {
    console.log("Add New Rule");

    let updatedChildren = children;

    const ruleItem = getNewRule();
    updatedChildren.push(ruleItem);
    setChildren(updatedChildren);
  };

  /**
   * Add new group with 1 Rule
   */
  const addNewGroup = () => {
    console.log("Add New Group");

    let updatedChildren = children;

    let ruleItem = getNewRule();
    let groupConfig: IGroup = {
      properties: {condition: "AND", type: "group" }
      , children: [ruleItem]
    };
    updatedChildren.push(groupConfig);
    setChildren(updatedChildren);
  };

  return (
    <div className={"groupItem"}>
      <div className="actionHeader">
        <ButtonBar
          labels={arrCondition}
          checked={arrCondition.indexOf(condition)}
          onChange={(i)=> {
            setCondition(arrCondition[i]);
            console.log("you have selected condition", arrCondition[i]); 
          }}></ButtonBar>

        <div className="addAction">
          <Button
            label={"Add Group"}
            theme="aqua"
            onClick={addNewGroup}/>
          <Button
            label={"Add Rule"}
            theme="aqua"
            onClick={addNewRule}/> 
          <Button 
            label={"🗑"} 
            theme="aqua"
            onClick={props.onGroupDelete}
            tooltip={{position: "top" ,text: "Delete Group"}}/>
        </div>
      </div>
      <div className="groupBody">
        {
          children.map((item, index) => {
            if(item.properties.type === "group") {
              return (<GroupItem 
                key={index}
                config={item as IGroup} 
                onGroupChange={(group) => updateChild(index, group)}
                onGroupDelete={()=> removeChild(index)} />);
            } else {
              return (<RuleItem 
                key={index}
                config={item as IRule} 
                onRuleChange={(rule) => updateChild(index, rule)}
                onRuleDelete={()=> removeChild(index)} />);
            }
          })
        }
      </div>
    </div>
  )
}