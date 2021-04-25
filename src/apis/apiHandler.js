import { personioApiInstance } from './axios';

const URL = {
    CANDIDATE: '/candidates',
};

export const getCandidates = async () => {
    try {
        const { data } = await personioApiInstance.get(URL.CANDIDATE);
        return data;
    } catch (error) {
        console.error(error);
    }
};
