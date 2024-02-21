import {IInputEnterFormProps} from "./IInputEnterFormProps";
import React from "react";

function InputEnterForm(props: IInputEnterFormProps) {
    return (
        <>
            {props.labelText && <label className="block mb-2">{props.labelText}</label>}
            <input
                className="inline-block mt-4 mb-4 text-center text-black" type="text" value={props.value}
                onChange={props.onChange} maxLength={props.maxLength}
                onKeyDown={(event) => {
                    if ([((props.enableSpace && props.value?.toString().length !== 0) ? '' : ' '), '/', '\\'].indexOf(event.key) !== -1) {
                        event.preventDefault();
                    }
                }}
            />
        </>
    );
}

export default InputEnterForm;