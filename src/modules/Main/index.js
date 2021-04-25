import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CandidateTable } from './../../components';
import { getCandidates } from '../../apis';
import { dummyResponse } from '../../constants';

const Main = () => {
    const history = useHistory();
    const [tableData, setTableData] = useState([]);
    const [candidateData, hasCandidateData] = useState(false);
    useEffect(() => {
        const fetchCandidateData = async () => {
            // const { data } = await getCandidates();
            // if (!data) {
            //     console.log('print here');
            //     history.push('/error');
            //     // in case of error redirect to error page
            // }
            console.log('dummyData', dummyResponse.data);
            setTableData(dummyResponse.data);
            hasCandidateData(true);
        };

        fetchCandidateData();
    }, []);
    return (
        <main className="main-container">
            {candidateData ? (
                <CandidateTable
                    candidateData={tableData}
                ></CandidateTable>
            ) : (
                <div>No Data</div>
            )}
        </main>
    );
};

export default Main;
