import { defineStore } from "pinia";
import { ref } from "vue";
import type {
    AuthLogin,
    AuthSignup
} from '@/services/auth/types';
import type { APIResponse } from '@/services/types';
import { API } from '@/services';
import type { AxiosError } from "axios";

export const useAuthStore = defineStore("authStore", () => {
    const authSignup = ref<AuthSignup[]>([]);
    const authLogin = ref<AuthLogin[]>([]);

    /*function initSchools(data: School[]) {
        schools.value = data;
    }

    function addNewSchool(school: School) {
        schools.value.push(school);
    }

    function removeSchool(id: number) {
        const idx = schools.value.findIndex((s) => s.id === id);
        if (idx === -1) return;
        schools.value.splice(idx, 1);
    }
*/
    /*async function dispatchGetSchools(): Promise<APIResponse<null>> {
        try {
            const { status, data } = await API.school.getSchools();
            if (status === 200) {
                initSchools(data.content);
                return {
                    success: true,
                    content: null,
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
    }*/

    async function dispatchCreateSignup(
        input: AuthSignup
    ): Promise<{ success: boolean; content: null|string|undefined; status: number|undefined }> {
        try {
            const { status, data } = await API.auth.doSignup(input);
            if (status === 200) {
                return {
                    status: 0,
                    success: true,
                    content: null
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


    async function dispatchCreateLogin(
        input: AuthLogin
    ): Promise<{ success: boolean; content: string; status: undefined|number }> {
        try {
            const { status, data } = await API.auth.doLogin(input);
            if (status === 200) {
                return {
                    status: 0,
                    success: true,
                    content: data
                };
            }
        } catch (error) {
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: JSON.stringify(_error.response?.data),
            };
        }
        return {
            success: false,
            content: '',
            status: 400,
        };
    }


    async function dispatchLogout(token: string): Promise<{ success: boolean; content: string; status: undefined|number }> {
        try {
            const { status, data } = await API.auth.doLogout(token);
            if (status === 200) {
                return {
                    success: true,
                    status: 200,
                    content: ''
                };
            }
        } catch (error) {
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: JSON.stringify(_error.response?.data),
            };
        }
        return {
            success: false,
            content: '',
            status: 400,
        };
    }

    /*async function dispatchDeleteSchool(id: number): Promise<APIResponse<null>> {
        try {
            const { status } = await API.school.deleteSchool(id);
            if (status === 200) {
                removeSchool(id);
                return {
                    success: true,
                    content: null,
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

    async function dispatchUpdateSchool(
        input: InputUpdateSchool
    ): Promise<APIResponse<null>> {
        try {
            const { status } = await API.school.updateSchool(input);
            if (status === 200) {
                return {
                    success: true,
                    content: null,
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
    }*/

    return {
        authSignup,
        authLogin,
        dispatchCreateSignup,
        dispatchCreateLogin,
        dispatchLogout,
    };
});