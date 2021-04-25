import React from 'react';
import { HEADERS } from '../constants';

const CandidateTable = () => {
    const headers = HEADERS;

    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Smith</td>
                    <td>John</td>
                    <td>jsmith@gmail.com</td>
                    <td>$50.00</td>
                    <td>http://www.jsmith.com</td>
                    <td>http://www.jsmith.com</td>
                    <td>http://www.jsmith.com</td>
                </tr>
            </tbody>
        </table>
    );
};

export default CandidateTable;
