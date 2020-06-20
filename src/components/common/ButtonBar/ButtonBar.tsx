
import React from "react";
import { Button } from "../Button/Button";

interface Props {
    labels: (string | JSX.Element)[];
    checked?: number;
	onChange?: (i: number) => void;
    style?: React.CSSProperties;
    className?: string;
    disabled?: boolean;
    id?: string;
}

interface idAttribute {
	id?: string;
}
export const ButtonBar: React.SFC<Props> = props => {
    let {
        labels = [""],
        checked,
        onChange,
		style = {},
		id,
		disabled,
		className = "activeButtonBar",
    } = props;

    const [selected, setSelected] = React.useState(checked);

	React.useEffect(() => {
		if (!(checked && checked > labels.length)) {
			setSelected(checked);
		}
	}, [checked]);
    
	let idAttr: idAttribute = {};
	if (id) {
		idAttr["id"] = id;
    }

    const onChangeHandler = (i: number) => {
		if (!disabled) {
			setSelected(i);
			onChange && onChange(i);
		}
	};

    return (
        <div className={"reToggle " + className}
            style={style}
        >
            {labels.map((label, i) => {
                return (
                    <Button
                        {...idAttr}
                        style={{ width: `${100 / labels.length}%` }}
                        className={"button"}
                        key={i}
                        onClick={() => onChangeHandler(i)}>
                        {label}
                    </Button>
                );
            })}
        </div>
    );
  }