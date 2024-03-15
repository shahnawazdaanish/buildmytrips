import type { interest } from '@/types/plantrip/index';

/*--Cuisines--*/
const cuisines: interest[] = [
    {
        id: 0,
        title: 'Australian',
    },
    {
        id: 1,
        title: 'Bangladeshi',
    },
    {
        id: 2,
        title: 'Brazilian',
    },
    {
        id: 3,
        title: 'Chinese',
    },
    {
        id: 4,
        title: 'Ethiopian',
    },
    {
        id: 5,
        title: 'Filipino',
    },
    {
        id: 6,
        title: 'Finnish',
    },
    {
        id: 7,
        title: 'German',
    },
    {
        id: 8,
        title: 'Greek',
    },
    {
        id: 9,
        title: 'Hawaiian',
    },
    {
        id: 10,
        title: 'Indian',
    },
    {
        id: 11,
        title: 'Indonesian',
    },
    {
        id: 12,
        title: 'Italian',
    },
    {
        id: 13,
        title: 'Jamaican',
    },
    {
        id: 14,
        title: 'Japanese',
    },
    {
        id: 15,
        title: 'Korean',
    },
    {
        id: 16,
        title: 'Malaysian',
    },
    {
        id: 17,
        title: 'Mexican',
    },
    {
        id: 18,
        title: 'Moroccan',
    },
    {
        id: 19,
        title: 'Russian',
    },
    {
        id: 20,
        title: 'Spanish',
    },
    {
        id: 21,
        title: 'Sri Lankan',
    },
    {
        id: 22,
        title: 'Swedish',
    },
    {
        id: 23,
        title: 'Thai',
    },
    {
        id: 24,
        title: 'Turkish',
    },
    {
        id: 25,
        title: 'Vietnamese',
    },
]

const interests: interest[] = [
    {
        id: 0,
        title: 'Artistic',
    },
    {
        id: 1,
        title: 'Beach',
    },
    {
        id: 2,
        title: 'City',
    },
    {
        id: 3,
        title: 'Countryside',
    },
    {
        id: 4,
        title: 'Cultural',
    },
    {
        id: 5,
        title: 'Entertainment',
    },
    {
        id: 6,
        title: 'Forested',
    },
    {
        id: 7,
        title: 'Historical',
    },
    {
        id: 8,
        title: 'Island',
    },
    {
        id: 9,
        title: 'Lakeside',
    },
    {
        id: 10,
        title: 'Military',
    },
    {
        id: 11,
        title: 'Mountains',
    },
    {
        id: 12,
        title: 'Museum',
    },
    {
        id: 13,
        title: 'Music',
    },
    {
        id: 14,
        title: 'Religious',
    },
    {
        id: 15,
        title: 'Ski',
    },
    {
        id: 16,
        title: 'Sporting Events',
    },
]

const aiApiResponse = {
    "1_msg": "",
    "2_best_combination": {
        "accommodation": {
            "name": "Sunset Terrace Apartments",
            "price": {
                "deluxe": 310,
                "standard": 280,
                "suite": 350
            }
        },
        "interest": {
            "name": "Historical",
            "price": 40,
            "type": "The Old Town Heritage"
        },
        "restaurant": {
            "name": "Daegu Dining",
            "price": 55,
            "type": "Korean"
        },
        "total_budget": 375
    },
    "3_second_best_combination": {
        "accommodation": {
            "name": "CosmoComfort Stay",
            "price": {
                "deluxe": 290,
                "standard": 260,
                "suite": 330
            }
        },
        "interest": {
            "name": "Historical",
            "price": 40,
            "type": "The Old Town Heritage"
        },
        "restaurant": {
            "name": "Karē Corner",
            "price": 70,
            "type": "Japanese"
        },
        "total_budget": 370
    },
    "4_third_best_combination": {
        "accommodation": {
            "name": "Forest Edge Retreat",
            "price": {
                "deluxe": 280,
                "standard": 250,
                "suite": 320
            }
        },
        "interest": {
            "name": "Historical",
            "price": 40,
            "type": "The Old Town Heritage"
        },
        "restaurant": {
            "name": "The Northern Story",
            "price": 75,
            "type": "Indian"
        },
        "total_budget": 365
    },
    "5_interest_for_days": [
        {
            "interest": {
                "name": "Rhapsody",
                "price": 15,
                "type": "Lakeside"
            }
        },
        {
            "interest": {
                "name": "Alpine Adobe",
                "price": 10,
                "type": "Lakeside"
            }
        },
        {
            "interest": {
                "name": "Canvas Cove",
                "price": 35,
                "type": "Music"
            }
        },
        {
            "interest": {
                "name": "Senerity Springs",
                "price": 25,
                "type": "Historical"
            }
        },
        {
            "interest": {
                "name": "Fern Forest",
                "price": 40,
                "type": "Lakeside"
            }
        },
        {
            "interest": {
                "name": "Battalion Base",
                "price": 10,
                "type": "Music"
            }
        },
        {
            "interest": {
                "name": "Legacy Lands",
                "price": 45,
                "type": "Music"
            }
        },
        {
            "interest": {
                "name": "Neon Nexus",
                "price": 25,
                "type": "Music"
            }
        }
    ],
    "6_restaurant_for_days": [
        {
            "restaurant": {
                "name": "Busan Bistro",
                "price": 30,
                "type": "Korean"
            }
        },
        {
            "restaurant": {
                "name": "Refreshing North",
                "price": 45,
                "type": "Indian"
            }
        },
        {
            "restaurant": {
                "name": "Yangyang Yummies",
                "price": 85,
                "type": "Korean"
            }
        },
        {
            "restaurant": {
                "name": "Nigiri Nirvana",
                "price": 40,
                "type": "Japanese"
            }
        },
        {
            "restaurant": {
                "name": "Home Of Mughlai Cuisine",
                "price": 55,
                "type": "Indian"
            }
        },
        {
            "restaurant": {
                "name": "Yuzu Yard",
                "price": 35,
                "type": "Japanese"
            }
        },
        {
            "restaurant": {
                "name": "Art of Spices",
                "price": 40,
                "type": "Indian"
            }
        },
        {
            "restaurant": {
                "name": "Gyudon Grove",
                "price": 50,
                "type": "Japanese"
            }
        }
    ]
}

export { cuisines, interests, aiApiResponse }
