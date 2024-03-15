import { array } from 'yup';

export type PreviousHistory = {
    id: string;
    title: string;
    link: string;
    budget: string;
    searched_at: object;
    location: string;
};

/*export type Interest = {
    title: string,
    icon: string,
}*/

export type SearchSteps = {
    interests: Array<Interest>;
    selectedInterests: Array<Interest>;
    currentWindow: number,
    budget: number,
}


export interface Recommendation {
    "1_msg":                     string;
    "2_best_combination":        BestCombination;
    "3_second_best_combination": BestCombination;
    "4_third_best_combination":  BestCombination;
    "5_interest_for_days":       The5_InterestForDay[];
    "6_restaurant_for_days":     The6_RestaurantForDay[];
}

export interface BestCombination {
    accommodation: Accommodation;
    interest:      Interest;
    restaurant:    Interest;
    total_budget:  number;
}

export interface Accommodation {
    name:  string;
    price: Price;
}

export interface Price {
    deluxe:   number;
    standard: number;
    suite:    number;
}

export interface Interest {
    name:  string;
    price: number;
    type:  string;
}

export interface The5_InterestForDay {
    interest: Interest;
}

export interface The6_RestaurantForDay {
    restaurant: Interest;
}

export type MLData = {
    city: string,
    budget: number,
    start_date: string,
    end_date: string,
    food: string,
    interest: string,
}
