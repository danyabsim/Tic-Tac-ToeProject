import {useState} from "react";
import {Switch} from '@headlessui/react';
import {IToggleButtonProps} from "./IToggleButtonProps";

function ToggleButton(props: IToggleButtonProps) {
    const [enabled, setEnabled] = useState(false);

    return (
        <Switch.Group>
            <div>
                <Switch.Label className="mr-2">{props.firstOption?.label}</Switch.Label>
                <Switch
                    checked={enabled}
                    onChange={
                        () => {
                            enabled ? props.firstOption?.onChange() : props.secondOption?.onChange();
                            setEnabled(!enabled);
                        }
                    }
                    className="bg-blue-600 relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <span className="sr-only">Enable</span>
                    <span
                        className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                </Switch>
                <Switch.Label className="ml-2">{props.secondOption?.label}</Switch.Label>
            </div>
        </Switch.Group>
    );
}

export default ToggleButton;