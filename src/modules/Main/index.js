import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { CandidateTable } from './../../components';
import { getCandidates } from '../../apis';
import { dummyResponse } from '../../constants';

import './index.scss';

// at the end implement react fallback loader
const Main = () => {
    const [tableData, setTableData] = useState([]);
    const [candidateData, hasCandidateData] = useState(false);
    useEffect(() => {
        const fetchCandidateData = async () => {
            setTableData(dummyResponse.data);
            hasCandidateData(true);
        };
        fetchCandidateData();
    }, []);
    return (
        <main className="main-container">
            <div className="candidate-table">
                {candidateData ? (
                    <CandidateTable
                        candidateData={tableData}
                    ></CandidateTable>
                ) : (
                    <div>No Data</div>
                )}
            </div>
        </main>
    );
};

export default Main;
