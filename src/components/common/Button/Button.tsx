
import React from "react";
import "./Button.css";
type toolTipPositions = "top" | "bottom" | "left" | "right";
type buttonThemes = "aqua" | "white" | "hollow" | "dark";
interface Props {
    label?: string;
	tooltip?: {
		text: string;
		position?: toolTipPositions;
	};
    onClick: ()=> void;
    style?: React.CSSProperties;
    className?: string;
    theme?: buttonThemes;
    disabled?: boolean;
    id?: string;
}
interface toolTip {
	tooltip?: string;
}
interface idAttribute {
	id?: string;
}
export const Button: React.SFC<Props> = props => {
    let {
		label = "",
		tooltip = {
			text: "",
		},
		style = {},
		id = "",
		disabled,
		className = ["reButton","aqua"].join(" "),
		theme,
	} = props;
    const btnStyleClasses: string[] = ["noOutline"];
    
	// If theme is given then className is ignored
	if (theme) {
		btnStyleClasses.push("reButton", theme);
	} else {
		btnStyleClasses.push(className);
	}

	if (disabled) btnStyleClasses.push("disabled");

	let tooltipObj: toolTip = {};
	if (tooltip.text) {
		tooltipObj["tooltip"] = tooltip.text;
	}
	
	let idAttr: idAttribute = {};
	if (id) {
		idAttr["id"] = id;
    }
    
    return (
      <div
        className={btnStyleClasses.join(" ")}
        style={style}
        onClick={disabled ? () => null : props.onClick}
        {...tooltipObj}
        {...idAttr}
        tooltip-position={tooltip.position || "top"}>
        {label}
        {props.children}
    </div>
    );
  }