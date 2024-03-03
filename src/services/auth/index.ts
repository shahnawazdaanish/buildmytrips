import http from "../api";
import type { AuthLogin, AuthSignup } from '@/services/auth/types';
import type { APIResponse } from '@/services/types';

async function doSignup(input: AuthSignup) {
    return http.post<APIResponse<AuthSignup>>("signup", input)
}
async function doLogin(input: AuthLogin) {
    return http.post<string>("login", input)
}
async function doLogout(token: string) {
    return http
        .get<APIResponse<string>>("logout", {headers: {'Authorization': 'Bearer ' + token}})
}
/*
async function getSchools() {
    return await http.get<APIResponse<AuthSignup[]>>("school");
}

async function deleteSchool(id: number) {
    return await http.delete<APIResponse<boolean>>(`school/${id}`);
}

async function createSchool(input: InputCreateSchool) {
    return await http.post<APIResponse<School>>("school", input);
}

async function updateSchool(input: InputUpdateSchool) {
    return await http.put<APIResponse<boolean>>("school", input);
}*/

export default {
    doSignup,
    doLogin,
    doLogout,
   /* createSchool,
    updateSchool,
    deleteSchool,*/
};