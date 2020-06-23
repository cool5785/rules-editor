import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { GroupItem, IGroup } from './components/Group';

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
  return (
    <div className="App">
      <header className="App-header">
        <GroupItem
          onGroupChange={(item)=> {
              console.log("Updated Group ",item);
          }}
          onGroupDelete={()=> console.log("Trying to delete root group")}
          config={ruleEditorConfig} />
      </header>
    </div>
  );
}

export default App;
