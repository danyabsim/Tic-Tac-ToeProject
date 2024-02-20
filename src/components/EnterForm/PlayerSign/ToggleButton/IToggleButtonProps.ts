export interface IToggleButtonProps {
    firstOption?: {
        label: string;
        onChange: () => void;
    };
    secondOption?: {
        label: string;
        onChange: () => void;
    };
}