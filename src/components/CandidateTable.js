import React, { useState, useEffect } from 'react';
import { HEADERS } from '../constants';
import Pagination from './Pagination';
import Filter from './Filter';
import { paginate } from '../utils';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import queryString from 'query-string';
import sortingImage from '../assets/sorting.png';

const SortingColumns = [
    'Position Applied',
    'Years of Experience',
    'Applied',
];

const sortingKeysMapping = [
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
    const totalCount = candidateData.length;
    const [pageNumber, setPageNumber] = useState(1); //page counter
    const [currentPageData, setCurrentPageData] = useState([]); // current page wise data
    const [nameFilter, setNameFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [postionFilter, setPositionFilter] = useState('');
    const pageSize = 10;

    // load the page 1 initially
    useEffect(() => {
        getPageData();
    }, []);

    const handlePageChange = (page) => {
        setPageNumber(page);
        getPageData();
    };

    const getPageData = () => {
        const paginationData = paginate(
            candidateData,
            pageNumber,
            pageSize,
        );
        setCurrentPageData(paginationData);
        // setTotalCount(totalCount);
        return {
            totalCount: candidateData.length,
            data: paginationData,
        };
    };

    const handleSortByColumn = (selectedHeader) => {
        let resultData = _.find(sortingKeysMapping, function (o) {
            if (o.label === selectedHeader) {
                o.sortBy = !o.sortBy;
            }
            return o.label === selectedHeader;
        });

        let sortByData = resultData.sortBy ? 'asc' : 'desc';
        setCurrentPageData(
            _.orderBy(
                currentPageData,
                [resultData.key],
                [sortByData],
            ),
        );
    };

    const onFilterSlection = (event) => {
        // console.log(
        //     'onFilterSlection',
        //     event.target.value,
        //     event.target.checked,
        // );
        // setSelectedFilter(event.target.value);
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
            // console.log('obj', obj.name.match(regexVar));
            if (obj.name.match(regexVar)) return true;
        });
        // console.log('newData', newData);
        // test with find function

        // let testData = _.every(currentPageData, [
        //     'name',
        //     name.match(regexVar).length > 0,
        // ]);

        // console.log('testData', testData);
        setCurrentPageData(newData);

        // _.filter(currentPageData, (obj) => nameValue.test(obj.name));
        setNameFilter(name);
    };

    const onPositionAppliedChangeValue = (position) => {
        // console.log('position', position);

        let regexVar = new RegExp(position, 'gi');
        let newData = _.filter(currentPageData, (obj) => {
            // console.log('obj', obj.position_applied.match(regexVar));
            if (obj.position_applied.match(regexVar)) return true;
        });

        setCurrentPageData(newData);
        // console.log('newData', newData);

        setPositionFilter(position);
    };

    useEffect(() => {
        function updateUrl() {
            const query = queryString.parse(location.search);
            // console.log('query', query);
            const modifiedQuery = {
                ...query,
                name: nameFilter !== '' ? nameFilter : query.name,
                position_applied:
                    postionFilter !== ''
                        ? postionFilter
                        : query.position_applied,
                status:
                    statusFilter !== '' ? statusFilter : query.status,
            };
            // console.log('modifiedQuery', modifiedQuery);
            history.replace({
                pathname: location.pathname,
                search: queryString.stringify(modifiedQuery),
            });
        }

        updateUrl();
    }, [nameFilter, statusFilter, postionFilter]);

    return (
        <div className="table-container">
            <Filter
                onStatusChanged={onStatusFilterChanged}
                onNameInputChange={onNameFilterChangeValue}
                onPositionApplied={onPositionAppliedChangeValue}
            />
            <div>
                <table>
                    <thead>
                        <tr>
                            {HEADERS.map((header) => {
                                let tempStr = header;
                                // if (SortingColumns.indexOf(header) > -1) {
                                //     tempStr = tempStr + '||';
                                // }
                                return (
                                    <th>
                                        <h5>{tempStr}</h5>
                                        {SortingColumns.indexOf(
                                            header,
                                        ) > -1 ? (
                                            <div>
                                                <img
                                                    className="sorting-columns"
                                                    src={sortingImage}
                                                    alt="sorting"
                                                    onClick={() =>
                                                        handleSortByColumn(
                                                            tempStr,
                                                        )
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            ''
                                        )}
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
                                <td>
                                    {candidate.year_of_experience}
                                </td>
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
                    currentPage={pageNumber}
                    onPageChange={handlePageChange}
                />
                page {pageNumber} of {totalCount / pageSize}
            </div>
        </div>
    );
};

export default CandidateTable;
