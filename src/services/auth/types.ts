export type AuthSignup = {
    name: string;
    email: string;
    password: string;
};

export type AuthLogin = {
    email: string;
    password: string;
    remember: boolean;
};

export type InputCreateSchool = {
    id: number;
    name: string;
    description: string;
};

export type InputUpdateSchool = {
    id: number;
    description: string;
};