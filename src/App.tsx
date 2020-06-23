import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { GroupItem, IGroup } from './components/Group';
import { IRule } from './components/RuleItem/RuleItem';

// TODO: Add logic to get this from Service
const ruleEditorConfig: IGroup = {
  properties: {
    condition: "AND",
    type: "group"
  }
  , children: [
    {
      properties: {
        type: "rule"
      },
      field: "qty",
      operation: "equals",
      value: [200]
    },
    {
      properties: {
        type: "rule"
      },
      field: "qty",
      operation: "notEqual",
      value: ["100"]
    },
    {
      properties: {
        type: "rule"
      },
      field: "product_name",
      operation: "notEqual",
      value: ["wooden box"]
    }
  ]
};

function App() {

  const getTabs = (level: number) => {
    return Array(level+1).join("\t");
  }
  const getRule = (item: IGroup, level: number) => {
    const condition = item.properties.condition;
    let ruleItem: string[] = [];
    if(condition === "NOT") {
      ruleItem.push("NOT (");
    }

    item.children.forEach((d) => {
      if(d.properties.type === "group") {
        ruleItem.push(getRule(d as IGroup, level+1));
      } else {
        const e = d as IRule;
        if(e.value.length) {
          const ruleStr = e.operation === "between" ? 
                `${e.field} ${e.operation} ${e.value[0]} AND ${e.value[1]}}`
                : `${e.field} ${e.operation} ${e.value.toString()}`;
          ruleItem.push(ruleStr);
        }
      }
    });
    if(condition === "NOT") {
      ruleItem.push(")");
      return ruleItem.join(`\n${getTabs(level)} `)
    } else {
      return `(\n${getTabs(level)}` + ruleItem.join(`\n${getTabs(level)}${condition} `) + " )";
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <GroupItem
          onGroupChange={(item)=> {
              console.log("Updated Group ",item);
              console.log("All Conditions ");
              console.log(getRule(item, 1));
              // TODO: Add logic to save to service
          }}
          onGroupDelete={()=> console.log("Trying to delete root group")}
          config={ruleEditorConfig} />
      </header>
    </div>
  );
}

export default App;
