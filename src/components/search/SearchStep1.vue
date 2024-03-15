<script setup>
import { useSearchStore } from '@/store/search';
import { computed, reactive, ref, watch } from 'vue';

const searchStore = useSearchStore();
const props = defineProps({
    trip: Object,
    valid: Boolean
})

const emit = defineEmits(['raiseError'])

const loading = ref(false);
const search = ref('');
const min = ref(50);
const max = ref(5000);
const bpm = ref(50);
const dateRanges = ref([new Date(), new Date()]);
const trip = reactive({ people: 1, city: '', budget:bpm, dates: dateRanges, food: [], interest: [] });
const form = ref();

const color = computed(() => {
    if (bpm.value < 500) return 'indigo';
    if (bpm.value < 1000) return 'teal';
    if (bpm.value < 3000) return 'green';
    if (bpm.value < 4000) return 'orange';
    return 'red';
});
const maxDate = computed(() => {
    let firstDate = new Date(JSON.parse(JSON.stringify(dateRanges.value[0])));
    firstDate.setDate(firstDate.getDate() + 3)

    return firstDate;
});

const decrement = () => {
    bpm.value--;
};
const increment = () => {
    bpm.value++;
};

const validate = async () => {
    const { valid } = await form.value.validate();
    return valid;
};
const reset = () => {
    this.$refs.form.reset();
};

const resetValidation = () => {
    this.$refs.form.resetValidation();
};
const showCalendar = () => {
    this.show.calendar = !this.show.calendar;
};
const incrementPeople = () => {
    const people = parseInt(trip.people, 10);
    trip.people = people < 10 ? (people + 1) : people;
};
const decrementPeople = () => {
    const people = parseInt(trip.people, 10);
    trip.people = people > 0 ? (people - 1) : people;
};

const picker = ref();
const showPicker = () => {
    picker.value.focus();
}
const convertDate = (date) => {
    return date.toISOString().slice(0, 10).replaceAll('-', '/');
}
const next = async (step) => {
    if (await validate()) {
        props.valid = true;

        props.trip.city = trip.city;
        props.trip.people = trip.people;
        props.trip.budget = trip.budget;
        props.trip.startDate = convertDate(trip.dates[0]);
        props.trip.endDate = convertDate(trip.dates[trip.dates.length - 1]);

        if (step.value < 3) {
            step.value = step.value + 1;
        }
    } else {
        props.valid = false;
    }
}

const prev = (step) => {
    if (step.value > 1) {
        step.value = step.value - 1;
    }
}

defineExpose({
    next,
    prev
});

watch(form?.value?.validate(), (newValue, oldValue) => {
    console.log(newValue, oldValue);
    this.props.valid = newValue;
});
</script>

<template>
    <v-form ref="form">

        <v-row>
            <v-col cols>
                <v-row align="center"
                       justify="center">
                    <v-col cols="1" style="text-align: center">
                        <v-icon color="primary" size="x-large" icon="mdi-map-search-outline"></v-icon>
                    </v-col>
                    <v-col cols="11">
                        <v-label class="mb-4 font-weight-bold">
                            Choose your destination for this trip
                        </v-label>
                        <v-autocomplete
                            flat
                            variant="solo-inverted"
                            autofocus="autofocus"
                            auto-select-first
                            item-color="primary"
                            label="Destination..."
                            no-data-text="We do not cover this city right now, we will add more cities soon!"
                            :items="['Turku']"
                            v-model="trip.city"
                            :rules="[v => !!v || 'Item is required']"
                        ></v-autocomplete>
                    </v-col>
                </v-row>
                <v-row align="center"
                       justify="center">
                    <v-col cols="1" style="text-align: center">
                        <v-icon color="primary" size="x-large" icon="mdi-account-heart"></v-icon>
                    </v-col>
                    <v-col cols="11">
                        <v-label class="mb-4 font-weight-bold">
                            How many people are going there with you?
                        </v-label>
                        <v-text-field
                            v-model="trip.people"
                            readonly
                            type="number"
                            label="Number"
                            append-icon="mdi-plus"
                            @click:append="incrementPeople"
                            prepend-icon="mdi-minus"
                            @click:prepend="decrementPeople"
                            :rules="[v => !!v || 'Item is required']"
                        ></v-text-field>
                    </v-col>
                    <v-row align="center"
                           justify="center">
                        <v-col cols="1" style="text-align: center">
                            <v-icon color="primary" size="x-large" icon="mdi-currency-eur"></v-icon>
                        </v-col>

                        <v-col cols="11">
                            <v-label class="mb-4 font-weight-bold">
                                How much are you planning to spend there?
                            </v-label>

                            <v-card-text>
                                <v-row
                                    class="mb-4"
                                    justify="space-between"
                                >
                                    <v-col class="text-center">
                                      <span
                                          class="text-h1 font-weight-light"
                                          v-text="bpm"
                                      ></span>
                                        <span class="subheading font-weight-light me-1">EURO</span>
                                    </v-col>
                                </v-row>

                                <v-slider
                                    v-model="bpm"
                                    :color="color"
                                    track-color="grey"
                                    :min="min"
                                    :max="max"
                                    :step="1"
                                    :rules="[v => !!v || 'Item is required']"
                                >
                                    <template v-slot:prepend>
                                        <v-btn
                                            size="small"
                                            variant="text"
                                            icon="mdi-minus"
                                            :color="color"
                                            @click="decrement"
                                        ></v-btn>
                                    </template>

                                    <template v-slot:append>
                                        <v-btn
                                            size="small"
                                            variant="text"
                                            icon="mdi-plus"
                                            :color="color"
                                            @click="increment"
                                        ></v-btn>
                                    </template>
                                </v-slider>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-row>
            </v-col>
            <v-col cols>
                <v-row align="center"
                       justify="center">
                    <v-col cols="12">
                        <v-label class="mb-4 font-weight-bold">
                            Select date(s) to plan this trip
                        </v-label>
                        <v-date-picker
                            :min="new Date()"
                            :max="maxDate"
                            multiple="range"
                            v-model="dateRanges"
                            elevation="5"
                            color="primary lighten-1"
                            popover-align="center"
                            :rules="[v => !!v || 'Item is required']"
                        ></v-date-picker>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

    </v-form>
</template>
