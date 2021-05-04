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
    const pageSize = 10;
    const query = queryString.parse(location.search);
    const totalCount = candidateData.length;
    const [pageNumber, setPageNumber] = useState(1); //page counter
    const [currentPageData, setCurrentPageData] = useState([]); // current page wise data
    const [nameFilter, setNameFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [postionFilter, setPositionFilter] = useState('');
    const [isFetchingData, dataFetched] = useState(false);

    const getPageData = () => {
        const paginationData = paginate(
            candidateData,
            pageNumber,
            pageSize,
        );
        let filteredData = [];
        if (!isFetchingData) {
            filteredData = _.filter(paginationData, (obj) => {
                if (obj.name.match(new RegExp(query.name, 'gi')))
                    return true;
            });
            filteredData = _.filter(filteredData, (obj) => {
                if (
                    obj.name.match(
                        new RegExp(query.position_applied, 'gi'),
                    )
                )
                    return true;
            });
            filteredData = _.filter(
                filteredData,
                (obj) => obj.status === query.status.toLowerCase(),
            );
        }
        filteredData =
            filteredData.length > 0 ? filteredData : paginationData;
        setCurrentPageData(filteredData);
        return {
            totalCount: candidateData.length,
            data: paginationData,
        };
    };

    // load the page 1 initially
    useEffect(() => {
        getPageData();
        dataFetched(true);
    }, []);

    const filterCurrentPageData = (filterParam) => {
        let regexVar = new RegExp(filterParam, 'gi');
        let newData = _.filter(currentPageData, (obj) => {
            if (obj.name.match(regexVar)) return true;
        });

        setCurrentPageData(newData);
    };

    const handlePageChange = (page) => {
        setPageNumber(page);
        getPageData();
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

    const onStatusFilterChanged = (selectedStatus) => {
        let filteredData = _.filter(
            currentPageData,
            (obj) => obj.status === selectedStatus.toLowerCase(),
        );

        setCurrentPageData(filteredData);
        setStatusFilter(selectedStatus);
    };

    const onNameFilterChangeValue = (name) => {
        filterCurrentPageData(name);

        setNameFilter(name);
    };

    const onPositionAppliedChangeValue = (position) => {
        filterCurrentPageData(position);
        setPositionFilter(position);
    };

    useEffect(() => {
        function updateUrl() {
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
