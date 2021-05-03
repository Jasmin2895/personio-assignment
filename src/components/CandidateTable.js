import React, { useState, useEffect } from 'react';
import { HEADERS } from '../constants';
import Pagination from './Pagination';
import Filter from './Filter';
import { paginate } from '../utils';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import queryString from 'query-string';

const SortingColumns = [
    'Position Applied',
    'Years of Experience',
    'Applied',
];

const SortingKeysMapping = [
    { key: 'position_applied', label: 'Position Applied', sortBy: 0 },
    {
        key: 'year_of_experience',
        label: 'Years of Experience',
        sortBy: 0,
    },
    { key: 'application_date', label: 'Applied', sortBy: 0 },
];

const CandidateTable = ({ candidateData }) => {
    const history = useHistory();
    const location = useLocation();
    const headers = HEADERS;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageData, setCurrentPageData] = useState([]);
    const [totalCount, setTotalCount] = useState(
        candidateData.length,
    );
    const [sortingOptions, sortKeysMapping] = useState(
        SortingKeysMapping,
    );
    const [selectedFilter, setSelectedFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [postionFilter, setPositionFilter] = useState('');
    const pageSize = 10;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        getPageData();
    };

    const getPageData = () => {
        const paginationData = paginate(
            candidateData,
            currentPage,
            pageSize,
        );
        setCurrentPageData(paginationData);
        setTotalCount(totalCount);
        return {
            totalCount: candidateData.length,
            data: paginationData,
        };
    };

    const handleSortByColumn = (columnHeading) => {
        if (columnHeading.indexOf('||') > -1) {
            console.log('data', currentPageData);
            let selectedHeader = columnHeading.split('||')[0];
            let resultData = _.find(sortingOptions, function (o) {
                if (o.label === selectedHeader) {
                    o.sortBy = !o.sortBy;
                }
                return o.label === selectedHeader;
            });

            // console.log('resultData', resultData);
            let sortByData = resultData.sortBy ? 'asc' : 'desc';
            // console.log('sortByData', sortByData);

            setCurrentPageData(
                _.orderBy(
                    currentPageData,
                    [resultData.key],
                    [sortByData],
                ),
            );
        }
    };

    const onFilterSlection = (event) => {
        // console.log(
        //     'onFilterSlection',
        //     event.target.value,
        //     event.target.checked,
        // );
        setSelectedFilter(event.target.value);
    };

    const onStatusFilterChanged = (selectedStatus) => {
        console.log(selectedStatus);
        // if (selectedFilter === 'status') {
        //     setStatusFilter(selectedStatus);
        // }

        let filteredData = _.filter(
            currentPageData,
            (obj) => obj.status === selectedStatus.toLowerCase(),
        );
        // setCurrentPageData(filteredData);
        // console.log('filteredData', filteredData);
        setCurrentPageData(filteredData);
        setStatusFilter(selectedStatus);
    };
    const onNameFilterChangeValue = (name) => {
        console.log('name', name);

        // console.log(
        //     'nameValue',
        //     nameValue,
        //     _.find(currentPageData, (obj) => {
        //         console.log('obj', nameValue.test(obj.name));
        //         return nameValue.test(obj.name);
        //     }),
        // );

        let regexVar = new RegExp(name, 'gi');
        let newData = _.filter(currentPageData, (obj) => {
            console.log('obj', obj.name.match(regexVar));
            return obj.name.match(regexVar);
        });
        console.log('newData', newData);
        setCurrentPageData(newData);

        // _.filter(currentPageData, (obj) => nameValue.test(obj.name));
        setNameFilter(name);
    };

    const onPositionAppliedChangeValue = (position) => {
        console.log('position', position);

        let regexVar = new RegExp(position, 'gi');
        let newData = _.filter(currentPageData, (obj) => {
            console.log('obj', obj.position_applied.match(regexVar));
            return obj.name.match(regexVar);
        });

        setCurrentPageData(newData);
        console.log('newData', newData);

        setPositionFilter(position);
    };

    useEffect(() => {
        console.log('changes done!!!!!');
        function updateUrl() {
            const query = queryString.parse(location.search);
            const modifiedQuery = {
                ...query,
                name: nameFilter,
                position_applied: postionFilter,
                status: statusFilter,
            };
            history.replace({
                pathname: location.pathname,
                search: queryString.stringify(modifiedQuery),
            });
        }

        updateUrl();
    }, [nameFilter, statusFilter, postionFilter]);

    return (
        <main className="main-container">
            <Filter
                onSelection={onFilterSlection}
                onStatusChanged={onStatusFilterChanged}
                onNameInputChange={onNameFilterChangeValue}
                onPositionApplied={onPositionAppliedChangeValue}
            />
            <table>
                <thead>
                    <tr>
                        {headers.map((header) => {
                            let tempStr = header;
                            if (SortingColumns.indexOf(header) > -1) {
                                tempStr = tempStr + '||';
                            }
                            return (
                                <th>
                                    <button
                                        onClick={() =>
                                            handleSortByColumn(
                                                tempStr,
                                            )
                                        }
                                    >
                                        {tempStr}
                                    </button>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((candidate) => (
                        <tr>
                            <td>{candidate.name}</td>
                            <td>{candidate.email}</td>
                            <td>{candidate.birth_date}</td>
                            <td>{candidate.year_of_experience}</td>
                            <td>{candidate.position_applied}</td>
                            <td>{candidate.application_date}</td>
                            <td>{candidate.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            page {currentPage} of {totalCount / pageSize}
        </main>
    );
};

export default CandidateTable;
