// import {useState} from "react";
import React from "react";
import { Button } from "./common/button/button";

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
      </div>
    )
  }