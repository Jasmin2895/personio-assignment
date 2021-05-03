import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { set } from 'lodash';

const Filter = ({
    onSelection,
    onNameInputChange,
    onStatusChanged,
    onPositionApplied,
}) => {
    const location = useLocation();
    const history = useHistory();
    const query = queryString.parse(location.search);
    const [isNameFilterSet, setNameFilter] = useState(
        query.name !== '' ? true : false,
    );
    const [isStatusFilter, setStatusFilter] = useState(
        query.status !== '' ? true : false,
    );
    const [isPositionFilterSet, setPositionFilter] = useState(
        query.position_applied !== '' ? true : false,
    );
    const [nameFilterValue, setNameFilterValue] = useState(
        query.name,
    );
    const [statusFilterValue, setStatusFilterValue] = useState(
        query.status,
    );
    const [positionFilterValue, setPositionFilterValue] = useState(
        query.position_applied,
    );
    // const [nameInput, setNameInput] = useState('');
    // const [positionApplied, setPositionApplied] = useState('');
    const [statusOption, setStatusOption] = useState(query.status);

    useEffect(() => {
        function fetchFiltersFromUrl() {
            if (!isNameFilterSet) {
                query.name = '';
            } else {
                query.name = nameFilterValue;
            }

            if (!isStatusFilter) {
                query.status = '';
            } else query.status = statusFilterValue;

            if (!isPositionFilterSet) {
                query.position_applied = '';
            } else {
                query.position_applied = positionFilterValue;
            }

            // } else if (!isStatusFilter) {
            //     query.status = '';
            // } else if (!isPositionFilterSet) {
            //     query.position_applied = '';
            // }
            history.replace({
                pathname: location.pathname,
                search: queryString.stringify(query),
            });
        }

        fetchFiltersFromUrl();
    }, [isNameFilterSet, isStatusFilter, isPositionFilterSet]);

    const handleFilterChange = (event) => {
        let currentValue = event.target.value;
        console.log(
            'handleFilterChange !!!!!!!!!!!',
            event.target.checked,
        );
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
            setNameFilterValue(event.target.value);
            onNameInputChange &&
                onNameInputChange(event.target.value);
        } else {
            setPositionFilterValue(event.target.value);
            onPositionApplied &&
                onPositionApplied(event.target.value);
        }
    };

    const handleStatusChange = (event) => {
        // console.log('handleStatusChange', event.target.name);
        setStatusFilterValue(event.target.value);
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
                                isChecked={isNameFilterSet}
                                onChange={handleFilterChange}
                            />
                            Name
                        </label>
                        {isNameFilterSet ? (
                            <div>
                                <input
                                    type="text"
                                    name="nameInput"
                                    value={nameFilterValue}
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
                                isChecked={isStatusFilter}
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
                                isChecked={isPositionFilterSet}
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
                                    value={positionFilterValue}
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
