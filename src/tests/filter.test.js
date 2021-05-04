import React from 'react';
import Filter from '../components/Filter';
import { dummyResponse } from '../constants/index';
import { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
const spy = jest.fn();

configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        search: { name: '', position_applied: '', status: '' },
    }),
    useHistory: () => ({
        replace: () => ({}),
    }),
}));

describe('Filter', () => {
    it('accepts filter props', () => {
        const wrapper = mount(
            <Filter
                onNameInputChange={spy()}
                onStatusChanged={spy()}
                onPositionApplied={spy()}
            />,
        );
        expect(wrapper.props().onNameInputChange).toEqual(spy());
        expect(wrapper.props().onStatusChanged).toEqual(spy());
        expect(wrapper.props().onPositionApplied).toEqual(spy());
    });
});
