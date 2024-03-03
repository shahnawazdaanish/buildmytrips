import { array } from 'yup';

export type PreviousHistory = {
    id: string;
    title: string;
    link: string;
    budget: string;
    searched_at: object;
    location: string;
};

export type Interest = {
    title: string,
    icon: string,
}

export type SearchSteps = {
    interests: Array<Interest>;
    selectedInterests: Array<Interest>;
    currentWindow: number,
    budget: number,
}