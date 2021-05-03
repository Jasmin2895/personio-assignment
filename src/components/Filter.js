import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';

const Filter = ({
    onSelection,
    onNameInputChange,
    onStatusChanged,
    onPositionApplied,
}) => {
    const [isNameFilterSet, setNameFilter] = useState(false);
    const [isStatusFilter, setStatusFilter] = useState(false);
    const [isPositionFilterSet, setPositionFilter] = useState(false);
    // const [nameInput, setNameInput] = useState('');
    // const [positionApplied, setPositionApplied] = useState('');
    const [statusOption, setStatusOption] = useState('');

    // useEffect(() => {
    //     onSelection && onSelection(false);
    // }, []);

    const handleFilterChange = (event) => {
        let currentValue = event.target.value;
        if (currentValue === 'name') {
            setNameFilter(event.target.checked);
        } else if (currentValue === 'status') {
            setStatusFilter(event.target.checked);
        } else if (currentValue === 'position_applied') {
            setPositionFilter(event.target.checked);
        }

        onSelection && onSelection(event);
    };
    const onInputChnage = (event) => {
        console.log('input', event.target.value, event.target.name);

        if (event.target.name === 'nameInput') {
            onNameInputChange &&
                onNameInputChange(event.target.value);
        } else {
            onPositionApplied &&
                onPositionApplied(event.target.value);
        }
    };

    const handleStatusChange = (event) => {
        // console.log('handleStatusChange', event.target.name);
        setStatusOption(event.target.name);
        onStatusChanged && onStatusChanged(event.target.name);
    };
    return (
        <div>
            <ul>
                <li>
                    <div>
                        <label>
                            <Checkbox
                                name="filter"
                                value="name"
                                onChange={handleFilterChange}
                            />
                            Name
                        </label>
                        {isNameFilterSet ? (
                            <div>
                                <input
                                    type="text"
                                    name="nameInput"
                                    onChange={onInputChnage}
                                ></input>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </li>
                <li>
                    <div>
                        <label>
                            <Checkbox
                                name="filter"
                                value="status"
                                onChange={handleFilterChange}
                            />
                            Status
                        </label>
                        <div>
                            {' '}
                            {isStatusFilter ? (
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            name="Approved"
                                            checked={
                                                statusOption ===
                                                'Approved'
                                            }
                                            onChange={
                                                handleStatusChange
                                            }
                                        ></input>
                                        Approved
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name="Rejected"
                                            checked={
                                                statusOption ===
                                                'Rejected'
                                            }
                                            onChange={
                                                handleStatusChange
                                            }
                                        ></input>
                                        Rejected
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name="Waiting"
                                            checked={
                                                statusOption ===
                                                'Waiting'
                                            }
                                            onChange={
                                                handleStatusChange
                                            }
                                        ></input>
                                        Waiting
                                    </label>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <label>
                            <Checkbox
                                name="filter"
                                value="position_applied"
                                onChange={handleFilterChange}
                            />
                            Position Applied
                        </label>
                    </div>
                    <div>
                        {isPositionFilterSet ? (
                            <div>
                                <input
                                    type="text"
                                    name="positionApplied"
                                    onChange={onInputChnage}
                                ></input>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Filter;
