<script setup>
import { computed, ref } from 'vue';
import { cuisines, interests } from '@/data/plantrip/planTripData';
import { useSearchStore } from '@/store/search';

const searchStore = useSearchStore();
const props = defineProps({
    trip: Object,
});

const emit = defineEmits(['raiseError']);
const amenities = ref([]);
const neighborhoods = ref([]);
const form = ref();
const loading = ref(false);

const selectedInterests = computed(() => {
    const amenitiesHeader = { type: 'subheader', title: 'Amenities' };
    const neighborhoodsHeader = { type: 'subheader', title: 'Neighborhood' };

    let selected = [];
    selected.push(amenitiesHeader);
    amenities.value.map(x => {return { title: x, value: x };}).forEach(x => selected.push(x));

    selected.push(neighborhoodsHeader);
    neighborhoods.value.map(x => {return { title: x, value: x };}).forEach(x => selected.push(x));

    return selected;
});

const getRecommendations = async () => {

    const data = {
        'city': props.trip.city,
        'budget': props.trip.budget,
        'start_date': props.trip.startDate,
        'end_date': props.trip.endDate,
        'food': amenities.value.map(x => cuisines.filter(y => y.id === x)[0].title),
        'interest': neighborhoods.value.map(x => interests.filter(y => y.id === x)[0].title)
    };
    const resp = await searchStore.dispatchFetchRecommendations(data);

    if (resp?.success) {

        if (resp && resp?.content) {
            props.trip.recommendation = resp.content;
            return true;
        }

    } else {
        if (resp?.content?.message) {
            if (resp?.content?.errors) {
                emit('raiseError', resp?.content?.message, Object.values(resp?.content?.errors));
            } else {
                emit('raiseError', 'Something went wrong', resp?.content?.message);
            }
        }
    }
    return false;
};

const validate = async () => {
    const { valid } = await form.value.validate();
    return !!valid;
};

const next = async (step) => {
    props.trip.recommendation = {};
    const { valid } = await form.value.validate();

    const chipValidation = amenities.value.length > 2 && neighborhoods.value.length > 2;

    if (valid && chipValidation) {
    // if (valid) {
        loading.value = true;
        const loaded = await getRecommendations();
        loading.value = false;

        if (loaded) {
            if (step.value < 3) {
                step.value = step.value + 1;
            }
        }
    } else {
        emit('raiseError', 'Invalid Input Given', 'You must select at least three items from each');
    }
};

const prev = (step) => {
    if (step.value > 1) {
        step.value = step.value - 1;
    }
};

defineExpose({
    next,
    prev
});
</script>

<template>
    <v-form ref="form">

        <v-row v-show="loading">
            <v-col
                class="text-subtitle-1 text-center"
                cols="12"
            >
                AI is generating the recommendation
            </v-col>
            <v-col cols="12">
                <v-progress-linear
                    color="primary"
                    height="6"
                    indeterminate
                    rounded
                ></v-progress-linear>
            </v-col>
        </v-row>

        <v-row align="center"
               justify="center">
            <v-col cols="12">
                <v-card variant="text"
                        class="mx-auto"
                >
                    <v-card-text>
                        <h2 class="text-h6 mb-2 text-primary">
                            Choose Cuisines that you like
                        </h2>

                        <v-chip-group
                            color="primary"
                            v-model="amenities"
                            column
                            multiple
                            :rules="[v => !!v || 'Item is required']"
                        >
                            <v-chip
                                v-for="(cuisine, i) in cuisines"
                                :key="i"
                                variant="outlined"
                                filter
                            >
                                {{ cuisine.title }}
                            </v-chip>
                        </v-chip-group>
                    </v-card-text>

                    <v-card-text>
                        <h2 class="text-h6 mb-2 text-primary">
                            Choose what attracts you!
                        </h2>

                        <v-chip-group
                            color="primary"
                            v-model="neighborhoods"
                            :rules="[v => !!v || 'Item is required']"
                            column
                            multiple
                        >
                            <v-chip
                                v-for="(interest, i) in interests"
                                :key="i"
                                variant="outlined"
                                filter
                            >
                                {{ interest.title }}
                            </v-chip>
                        </v-chip-group>
                    </v-card-text>
                </v-card>
            </v-col>
            <!--            <v-col cols="4">
                            <v-card
                                class="mx-auto"
                                max-width="400"
                            >
                                <v-toolbar
                                    color="deep-purple-accent-4"
                                    dark
                                    flat
                                >
                                    <v-toolbar-title>Chosen Interests</v-toolbar-title>
                                </v-toolbar>

                                <v-card-text>
                                    <v-list :items="selectedInterests"></v-list>
                                </v-card-text>
                            </v-card>
                        </v-col>-->
        </v-row>
    </v-form>
</template>
