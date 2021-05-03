import React, { useState } from 'react';

const Checkbox = ({ onChange, isChecked, ...checkboxProps }) => {
    console.log('Checkbox!!!!!!', isChecked);
    const [isFilterChecked, setIsChecked] = useState(isChecked);

    const changeHandler = (event) => {
        setIsChecked(!isFilterChecked);

        onChange && onChange(event);
    };
    return (
        <>
            <span>
                {' '}
                <input
                    type="checkbox"
                    checked={isFilterChecked}
                    onChange={changeHandler}
                    {...checkboxProps}
                />
            </span>
        </>
    );
};

export default Checkbox;
