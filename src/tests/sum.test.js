import React from 'react';
import CandidateTable from '../components/CandidateTable';
import { dummyResponse } from '../constants/index';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe('CandidateTable', () => {
    it('accepts user account props', () => {
        const wrapper = mount(
            <CandidateTable candidateData={dummyResponse} />,
        );
        expect(wrapper.props().candidateData).toEqual(dummyResponse);
    });
});
