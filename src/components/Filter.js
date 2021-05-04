import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

const applicationStatus = ['Approved', 'Rejected', 'Waiting'];

const Filter = ({
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

            history.replace({
                pathname: location.pathname,
                search: queryString.stringify(query),
            });
        }

        fetchFiltersFromUrl();
    }, [isNameFilterSet, isStatusFilter, isPositionFilterSet]);

    const handleFilterChange = (event) => {
        let currentValue = event.target.value;

        if (currentValue === 'name') {
            setNameFilter(event.target.checked);
        } else if (currentValue === 'status') {
            setStatusFilter(event.target.checked);
        } else if (currentValue === 'position_applied') {
            setPositionFilter(event.target.checked);
        }
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
        <div className="table-filters">
            <h3>Filters</h3>
            <div className="filter-item">
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
                    <div className="filter-item-value">
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

            <div className="filter-item">
                <label>
                    <Checkbox
                        name="filter"
                        value="status"
                        isChecked={isStatusFilter}
                        onChange={handleFilterChange}
                    />
                    Status
                </label>
                <div className="filter-item-value">
                    {' '}
                    {isStatusFilter ? (
                        <div>
                            {applicationStatus.map((status) => {
                                return (
                                    <div className="filter-status">
                                        <label>
                                            <input
                                                type="radio"
                                                name={status}
                                                checked={
                                                    statusOption ===
                                                    status
                                                }
                                                onChange={
                                                    handleStatusChange
                                                }
                                            ></input>
                                            {status}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>

            <div className="filter-item">
                <label>
                    <Checkbox
                        name="filter"
                        value="position_applied"
                        isChecked={isPositionFilterSet}
                        onChange={handleFilterChange}
                    />
                    Position Applied
                </label>
                <div className="filter-item-value">
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
            </div>
        </div>
    );
};

export default Filter;
