import React from 'react';
import CandidateTable from '../components/CandidateTable';
import { dummyResponse } from '../constants/index';
import { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';

configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        search: { name: '', position_applied: '', status: '' },
    }),
    useHistory: () => ({
        replace: () => ({}),
    }),
}));

describe('CandidateTable', () => {
    it('accepts candidate table props', () => {
        const wrapper = mount(
            <CandidateTable candidateData={dummyResponse} />,
        );
        expect(wrapper.props().candidateData).toEqual(dummyResponse);
    });
});
