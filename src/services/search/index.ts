import http from '../api';
import type {Interest, MLData, PreviousHistory, Recommendation} from '@/services/search/types';


async function fetchHistory() {
    const token = localStorage.getItem('token');
    return http.get<PreviousHistory[]>("previous_history", {
        headers : {"Authorization" : "Bearer " + token}
    })
}

async function fetchInterestList() {
    const token = localStorage.getItem('token');
    return http.get<Interest[]>("generic_interests", {
        headers : {"Authorization" : "Bearer " + token}
    })
}

async function fetchRecommendations(data: MLData) {
    const token = localStorage.getItem('token');
    return http.post<Recommendation>(
        "get_recommendations",
        data,
        {
            headers : {"Authorization" : "Bearer " + token}
        },
    )
}

export default {
    fetchHistory,
    fetchInterestList,
    fetchRecommendations,
};
