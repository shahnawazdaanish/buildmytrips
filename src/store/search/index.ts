import { defineStore } from "pinia";
import { ref } from "vue";
import type {
    Interest, MLData,
    PreviousHistory, Recommendation, SearchSteps
} from '@/services/search/types';
import type { APIResponse } from '@/services/types';
import { API } from '@/services';
import type { AxiosError } from "axios";

export const useSearchStore = defineStore("searchStore", () => {
    const previousHistory = ref<PreviousHistory[]>([]);
    const searchInterests = ref<Interest[]>([]);
    const searchStepInformation = ref<SearchSteps>({
        interests: [],
        currentWindow: 0,
        selectedInterests: [],
        budget: 0,
    })

    function initPreviousHistory(data: PreviousHistory[]) {
        previousHistory.value = data;
    }
    function initGenericSearchInterests(data: Interest[]) {
        searchInterests.value = data;

        if (searchStepInformation.value) {
            searchStepInformation.value.interests = data
        }
    }

    async function dispatchGetPrevHistory(): Promise<{ success: boolean; content: null; status: number|undefined }> {
        try {
            const { status, data } = await API.search.fetchHistory();
            if (status === 200) {
                initPreviousHistory(data);
                return {
                    status: status,
                    success: true,
                    content: null
                };
            }
        } catch (error) {
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: null,
            };
        }
        return {
            success: false,
            content: null,
            status: 400,
        };
    }


    async function dispatchGetGenericSearchInterests(): Promise<{ success: boolean; content: null; status: number|undefined }> {
        try {
            const { status, data } = await API.search.fetchInterestList();
            if (status === 200) {
                initGenericSearchInterests(data);
                return {
                    status: status,
                    success: true,
                    content: null
                };
            }
        } catch (error) {
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: null,
            };
        }
        return {
            success: false,
            content: null,
            status: 400,
        };
    }


    async function dispatchFetchRecommendations(mlData: MLData): Promise<{ success: boolean; content: string|Object; status: number }> {
        try {
            const { status, data } = await API.search.fetchRecommendations(mlData);
            console.log('errorNet', status, data);
            if (status === 200) {
                // initGenericSearchInterests(data);
                return {
                    status: status,
                    success: true,
                    // @ts-ignore
                    content: data
                };
            }
        } catch (error) {
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: _error.response?.data,
            };
        }
        return {
            success: false,
            content: null,
            status: 400,
        };
    }

    return {
        previousHistory,
        searchInterests,
        searchStepInformation,
        dispatchGetPrevHistory,
        dispatchGetGenericSearchInterests,
        dispatchFetchRecommendations,
    };
});
