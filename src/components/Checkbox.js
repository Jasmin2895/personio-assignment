import React, { useState } from 'react';

const Checkbox = ({ onChange, ...checkboxProps }) => {
    const [isChecked, setIsChecked] = useState(false);

    const changeHandler = (event) => {
        setIsChecked(!isChecked);

        onChange && onChange(event);
    };
    return (
        <>
            <span>
                {' '}
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={changeHandler}
                    {...checkboxProps}
                />
            </span>
        </>
    );
};

export default Checkbox;
