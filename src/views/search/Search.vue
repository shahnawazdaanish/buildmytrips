<script setup lang="ts">
import {reactive, ref} from 'vue';
import {useSearchStore} from '@/store/search';
import SearchStep1 from "@/components/search/SearchStep1.vue";
import SearchStep2 from "@/components/search/SearchStep2.vue";
import SearchStep3 from "@/components/search/SearchStep3.vue";
import ErrorAlert from "@/components/shared/ErrorAlert.vue";

const resetTripValue = { people: 1, city: '', budget:0, startDate: '', endDate:'', food: [], interest: [], recommendation: {} };

const searchStore = useSearchStore();
const events = ref([]);
const input = ref(null);
let trip = reactive(JSON.parse(JSON.stringify(resetTripValue)));
let step = ref(1);
const step1 = ref();
const step2 = ref();
const step3 = ref();
const valid = ref(true);
const errorTitle = ref('');
const errorMessage = ref(null);
const nextText = ref('Next');
const prevText = ref('Prev');

const callNext = () => {
    const currentStep = step.value === 1 ? step1 : (step.value === 2 ? step2 : step3);
    currentStep.value.next(step);
}

const callPrev = () => {
    const currentStep = step.value === 1 ? step1 : (step.value === 2 ? step2 : step3);
    currentStep.value.prev(step);
}

const restart = () => {
    trip = reactive(resetTripValue);
    step.value = 1;
}

const raiseError = (title, message) => {
    errorTitle.value = title;
    errorMessage.value = message;
}

const resetError = () => {
    errorTitle.value = '';
    errorMessage.value = null;
}

</script>

<template>

    <v-row>
        <v-col>
            <v-card rounded class="plan-trip">
                <v-toolbar
                    color="primary"
                    flat
                >
                    <v-toolbar-title>Plan a trip</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn border :disabled="step === 1" @click="restart">
                        Restart again
                    </v-btn>
                </v-toolbar>

                <v-container>
                    <ErrorAlert
                        v-if="errorMessage !== null"
                        :title="errorTitle"
                        :message="errorMessage"
                        @resetError="resetError"
                    />

                    <v-row>
                        <v-col>
                            <v-stepper
                                v-model="step"
                                flat
                                :items="['1','2','3']"
                                hide-actions
                            >
                                <template v-slot:item.1>
                                    <v-card flat>
                                        <SearchStep1 ref="step1" :trip="trip" :valid="valid" @raiseError="raiseError" />
                                    </v-card>
                                </template>

                                <template v-slot:item.2>
                                    <v-card flat>
                                        <SearchStep2 ref="step2" :trip="trip" :valid="valid" @raiseError="raiseError"  />
                                    </v-card>
                                </template>

                                <template v-slot:item.3>
                                    <v-card flat>
                                        <SearchStep3 ref="step3"
                                                     :trip="trip"
                                                     :valid="valid"
                                                     :next-text="nextText"
                                                     :prev-text="prevText"
                                                     @raiseError="raiseError"
                                                     @restart="restart"
                                        />
                                    </v-card>
                                </template>

                                <v-stepper-actions v-if="step !== 3"
                                    :prev-text="prevText"
                                    @click:next="callNext"
                                    @click:prev="callPrev"
                                    :next-text="nextText"
                                ></v-stepper-actions>
                            </v-stepper>
                        </v-col>
                    </v-row>

                </v-container>

            </v-card>
        </v-col>
    </v-row>
</template>
