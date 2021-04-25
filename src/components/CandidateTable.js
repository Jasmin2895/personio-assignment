import React, { useState } from 'react';
import { HEADERS } from '../constants';
import Pagination from './Pagination';
import { paginate } from '../utils';
import _ from 'lodash';

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
    const headers = HEADERS;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageData, setCurrentPageData] = useState([]);
    const [totalCount, setTotalCount] = useState(
        candidateData.length,
    );
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
            let resultData = _.find(SortingKeysMapping, function (o) {
                return o.label === selectedHeader;
            });

            console.log('resultData', resultData);

            setCurrentPageData(
                _.orderBy(currentPageData, [resultData.key], ['asc']),
            );
        }
    };

    return (
        <main className="main-container">
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
