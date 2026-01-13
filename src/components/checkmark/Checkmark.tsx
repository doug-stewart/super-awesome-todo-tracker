import Checked from "@assets/checked.svg?react";
import Unchecked from "@assets/unchecked.svg?react";

type CheckmarkProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    checked: boolean;
};

export const Checkmark = (props: CheckmarkProps) => {
    const { checked, ...rest } = props;
    return (
        <button type="button" role="switch" aria-checked={checked} {...rest}>
            {checked ? <Checked /> : <Unchecked />}
        </button>
    );
};
