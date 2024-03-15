<script setup>
import { computed, onMounted, ref, toRefs } from 'vue';
import { cuisines, interests } from '@/data/plantrip/planTripData';
import { useSearchStore } from '@/store/search';
import Swal from 'sweetalert2';

const searchStore = useSearchStore();
const props = defineProps({
    trip: Object,
    nextText: String,
    prevText: String
})
const emit = defineEmits(['restart'])

const { nextText, prevText } = toRefs(props)

const amenities = ref([]);
const neighborhoods = ref([]);
const selectedBest = ref('');

const save = () => {

    Swal.fire({
        title: "Are you sure?",
        text: "This will save your chosen recommendation!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Saved!",
                text: 'Successfully saved your recommendation!',
                icon: "success",
            });

            emit('restart')
        }
    });
};

// const recommendations = {
//     '1_msg': '',
//     '2_best_combination': {
//         'accommodation': {
//             'name': 'Sunset Terrace Apartments',
//             'price': {
//                 'deluxe': 310,
//                 'standard': 280,
//                 'suite': 350
//             }
//         },
//         'interest': {
//             'name': 'Historical',
//             'price': 40,
//             'type': 'The Old Town Heritage'
//         },
//         'restaurant': {
//             'name': 'Daegu Dining',
//             'price': 55,
//             'type': 'Korean'
//         },
//         'total_budget': 375
//     },
//     '3_second_best_combination': {
//         'accommodation': {
//             'name': 'CosmoComfort Stay',
//             'price': {
//                 'deluxe': 290,
//                 'standard': 260,
//                 'suite': 330
//             }
//         },
//         'interest': {
//             'name': 'Historical',
//             'price': 40,
//             'type': 'The Old Town Heritage'
//         },
//         'restaurant': {
//             'name': 'Karē Corner',
//             'price': 70,
//             'type': 'Japanese'
//         },
//         'total_budget': 370
//     },
//     '4_third_best_combination': {
//         'accommodation': {
//             'name': 'Forest Edge Retreat',
//             'price': {
//                 'deluxe': 280,
//                 'standard': 250,
//                 'suite': 320
//             }
//         },
//         'interest': {
//             'name': 'Historical',
//             'price': 40,
//             'type': 'The Old Town Heritage'
//         },
//         'restaurant': {
//             'name': 'The Northern Story',
//             'price': 75,
//             'type': 'Indian'
//         },
//         'total_budget': 365
//     },
//     '5_interest_for_days': [
//         {
//             'interest': {
//                 'name': 'Rhapsody',
//                 'price': 15,
//                 'type': 'Lakeside'
//             }
//         },
//         {
//             'interest': {
//                 'name': 'Alpine Adobe',
//                 'price': 10,
//                 'type': 'Lakeside'
//             }
//         },
//         {
//             'interest': {
//                 'name': 'Canvas Cove',
//                 'price': 35,
//                 'type': 'Music'
//             }
//         },
//         {
//             'interest': {
//                 'name': 'Senerity Springs',
//                 'price': 25,
//                 'type': 'Historical'
//             }
//         },
//         {
//             'interest': {
//                 'name': 'Fern Forest',
//                 'price': 40,
//                 'type': 'Lakeside'
//             }
//         },
//         {
//             'interest': {
//                 'name': 'Battalion Base',
//                 'price': 10,
//                 'type': 'Music'
//             }
//         },
//         {
//             'interest': {
//                 'name': 'Legacy Lands',
//                 'price': 45,
//                 'type': 'Music'
//             }
//         },
//         {
//             'interest': {
//                 'name': 'Neon Nexus',
//                 'price': 25,
//                 'type': 'Music'
//             }
//         }
//     ],
//     '6_restaurant_for_days': [
//         {
//             'restaurant': {
//                 'name': 'Busan Bistro',
//                 'price': 30,
//                 'type': 'Korean'
//             }
//         },
//         {
//             'restaurant': {
//                 'name': 'Refreshing North',
//                 'price': 45,
//                 'type': 'Indian'
//             }
//         },
//         {
//             'restaurant': {
//                 'name': 'Yangyang Yummies',
//                 'price': 85,
//                 'type': 'Korean'
//             }
//         },
//         {
//             'restaurant': {
//                 'name': 'Nigiri Nirvana',
//                 'price': 40,
//                 'type': 'Japanese'
//             }
//         },
//         {
//             'restaurant': {
//                 'name': 'Home Of Mughlai Cuisine',
//                 'price': 55,
//                 'type': 'Indian'
//             }
//         },
//         {
//             'restaurant': {
//                 'name': 'Yuzu Yard',
//                 'price': 35,
//                 'type': 'Japanese'
//             }
//         },
//         {
//             'restaurant': {
//                 'name': 'Art of Spices',
//                 'price': 40,
//                 'type': 'Indian'
//             }
//         },
//         {
//             'restaurant': {
//                 'name': 'Gyudon Grove',
//                 'price': 50,
//                 'type': 'Japanese'
//             }
//         }
//     ]
// };

const recommendations = props.trip?.recommendation;
</script>

<template>
    <v-form ref="form">

        <v-row align="center"
               justify="center">
            <v-col cols="12">
                <v-card variant="text"
                        class="mx-auto"
                >
                    <v-card-text>
                        <h2 class="text-h2 mb-8 text-primary text-center">
                            Choose or customize your trip plan
                        </h2>

                        <v-table density="comfortable">
                            <thead>
                            <tr>
                                <th></th>
                                <th class="text-left bg-primary">
                                    Best Package
                                </th>
                                <th class="text-left bg-primary">
                                    Second Best Package
                                </th>
                                <th class="text-left bg-primary">
                                    Third Best Package
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="font-weight-bold text-primary">Accommodation</td>
                                <td class="bg-lightprimary">{{
                                        recommendations['best_combination']?.accommodation?.name
                                    }}
                                </td>
                                <td class="bg-lightprimary">
                                    {{ recommendations['second_best_combination']?.accommodation?.name }}
                                </td>
                                <td class="bg-lightprimary">
                                    {{ recommendations['third_best_combination']?.accommodation?.name }}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold text-primary">Interesting Places</td>
                                <td class="bg-lightprimary">{{
                                        recommendations['best_combination']?.interest?.name
                                    }}
                                </td>
                                <td class="bg-lightprimary">
                                    {{ recommendations['second_best_combination']?.interest?.name }}
                                </td>
                                <td class="bg-lightprimary">{{
                                        recommendations['third_best_combination']?.interest?.name
                                    }}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold text-primary">Restaurant and Cuisine</td>
                                <td class="bg-lightprimary">{{
                                        recommendations['best_combination']?.restaurant?.name
                                    }}
                                </td>
                                <td class="bg-lightprimary">
                                    {{ recommendations['second_best_combination']?.restaurant?.name }}
                                </td>
                                <td class="bg-lightprimary">
                                    {{ recommendations['third_best_combination']?.restaurant?.name }}
                                </td>
                            </tr>
                            <tr>
                                <td class="text-right ">Cost</td>
                                <td class="bg-muted text-center text-lg-h4">
                                    {{ recommendations['best_combination']?.total_budget }} euro
                                </td>
                                <td class="bg-muted text-center text-lg-h4">
                                    {{ recommendations['second_best_combination']?.total_budget }} euro
                                </td>
                                <td class="bg-muted text-center text-lg-h4">
                                    {{ recommendations['third_best_combination']?.total_budget }} euro
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="text-center">
                                    <v-radio-group
                                        v-model="selectedBest"
                                        inline
                                    >
                                        <v-radio
                                            value="best_combination"
                                        ></v-radio>
                                    </v-radio-group>
                                </td>
                                <td class="text-center">
                                    <v-radio-group
                                        v-model="selectedBest"
                                        inline
                                    >
                                        <v-radio
                                            value="second_best_combination"
                                        ></v-radio>
                                    </v-radio-group>
                                </td>
                                <td class="text-center">
                                    <v-radio-group
                                        v-model="selectedBest"
                                        inline
                                    >
                                        <v-radio
                                            value="third_best_combination"
                                        ></v-radio>
                                    </v-radio-group>
                                </td>
                            </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>

                    <v-card-text>
                        <v-row class="text-right" align="end" justify="end">
                            <v-col>
                                <v-btn @click="save" variant="flat" color="primary">Save Recommendation</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>


                </v-card>
            </v-col>
        </v-row>
    </v-form>
</template>
