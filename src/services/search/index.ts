import http from '../api';
import type { Interest, PreviousHistory } from '@/services/search/types';

const token = localStorage.getItem('token')
async function fetchHistory() {
    return http.get<PreviousHistory[]>("previous_history", {
        headers : {"Authorization" : "Bearer " + token}
    })
}

async function fetchInterestList() {
    return http.get<Interest[]>("generic_interests", {
        headers : {"Authorization" : "Bearer " + token}
    })
}

export default {
    fetchHistory,
    fetchInterestList,
};