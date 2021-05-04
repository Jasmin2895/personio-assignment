import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CandidateTable } from './../../components';
import { getCandidates } from '../../apis';
// import { dummyResponse } from '../../constants';

import './index.scss';

// at the end implement react fallback loader
const Main = () => {
    const history = useHistory();
    const [tableData, setTableData] = useState([]);
    const [candidateData, hasCandidateData] = useState(false);
    useEffect(() => {
        const fetchCandidateData = async () => {
            const { data } = await getCandidates();
            console.log('data', data);
            if (data) {
                setTableData(data);
                hasCandidateData(true);
            } else {
                history.push('/error');
            }
        };
        fetchCandidateData();
    }, []);
    return (
        <main className="main-container">
            <div className="candidate-table">
                <h2>Candidate Table</h2>
                {candidateData ? (
                    <CandidateTable
                        candidateData={tableData}
                    ></CandidateTable>
                ) : (
                    <div>Fetching data...</div>
                )}
            </div>
        </main>
    );
};

export default Main;
