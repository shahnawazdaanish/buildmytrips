<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import Heading from "@/components/style-components/typography/Heading.vue";
import Default from "@/components/style-components/typography/DefaultText.vue";
import SearchStepper from '@/components/search/SearchStepper.vue';
import { computed, ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useField, useForm } from 'vee-validate';
import { router } from '@/router';
import SearchForm from '@/components/auth/SearchForm.vue';
import { useSearchStore } from '@/store/search';

const searchStore = useSearchStore();
const events = ref([]);
const input = ref(null);
let nonce = ref(0);

const timeline = computed(()=> {
    return events.value.slice().reverse();
});

const currentWindow = computed(() => {
    return searchStore.searchStepInformation.currentWindow;
});

const comment = () => {
};

</script>

<template>
    <v-row>
        <v-stepper width="100%" :items="['Step 1', 'Step 2', 'Step 3']">
            <template v-slot:item.1>
                <v-card title="Step One" flat>...</v-card>
            </template>

            <template v-slot:item.2>
                <v-card title="Step Two" flat>...</v-card>
            </template>

            <template v-slot:item.3>
                <v-card title="Step Three" flat>...</v-card>
            </template>
        </v-stepper>
    </v-row>

    <v-row>
        <v-col cols="12" md="12">
            <SearchForm/>
        </v-col>
    </v-row>

    <v-row v-show="currentWindow > 1">
        <v-col>
            <v-timeline
                density="compact"
                side="end"
            >
                <v-timeline-item
                    fill-dot
                    class="mb-12"
                    dot-color="primary"
                    size="large"
                >
                    <template v-slot:icon>
                        <span>JL</span>
                    </template>
                    <v-text-field
                        v-model="input"
                        hide-details
                        label="Leave a comment..."
                        density="compact"
                        @keydown.enter="comment"
                    >
                        <template v-slot:append>
                            <v-btn
                                color="primary"
                                class="mx-0"
                                variant="text"
                                @click="comment"
                            >
                                Post
                            </v-btn>
                        </template>
                    </v-text-field>
                </v-timeline-item>

                <v-slide-x-transition group>
                    <v-timeline-item
                        v-for="event in timeline"
                        :key="event.id"
                        class="mb-4"
                        dot-color="pink"
                        size="small"
                    >
                        <div class="d-flex justify-space-between flex-grow-1">
                            <div>{{ event.text }}</div>
                            <div class="flex-shrink-0">{{ event.time }}</div>
                        </div>
                    </v-timeline-item>
                </v-slide-x-transition>

                <v-timeline-item
                    class="mb-6"
                    hide-dot
                >
                    <span>TODAY</span>
                </v-timeline-item>

                <v-timeline-item
                    class="mb-4"
                    dot-color="grey"
                    size="small"
                >
                    <div class="d-flex justify-space-between flex-grow-1">
                        <div>
                            This order was archived.
                        </div>
                        <div class="flex-shrink-0">
                            15:26 EDT
                        </div>
                    </div>
                </v-timeline-item>

                <v-timeline-item
                    class="mb-4"
                    dot-color="primary"
                    size="small"
                >
                    <div class="d-flex justify-space-between flex-grow-1">
                        <div>
                            <v-chip
                                class="ms-0"
                                color="purple"
                                label
                                size="small"
                            >
                                APP
                            </v-chip>
                            Digital Downloads fulfilled 1 item.
                        </div>
                        <div class="flex-shrink-0">
                            15:25 EDT
                        </div>
                    </div>
                </v-timeline-item>

                <v-timeline-item
                    class="mb-4"
                    dot-color="grey"
                    size="small"
                >
                    <div class="d-flex justify-space-between flex-grow-1">
                        <div>
                            Order confirmation email was sent to John Leider (john@google.com).
                        </div>
                        <div class="flex-shrink-0">
                            15:25 EDT
                        </div>
                    </div>
                </v-timeline-item>

                <v-timeline-item
                    class="mb-4"
                    hide-dot
                >
                    <v-btn
                        variant="outlined"
                    >
                        Resend Email
                    </v-btn>
                </v-timeline-item>

                <v-timeline-item
                    class="mb-4"
                    dot-color="grey"
                    size="small"
                >
                    <div class="d-flex justify-space-between flex-grow-1">
                        <div>
                            A $15.00 USD payment was processed on PayPal Express Checkout
                        </div>
                        <div class="flex-shrink-0">
                            15:25 EDT
                        </div>
                    </div>
                </v-timeline-item>

                <v-timeline-item
                    dot-color="grey"
                    size="small"
                >
                    <div class="d-flex justify-space-between flex-grow-1">
                        <div>
                            John Leider placed this order on Online Store (checkout #1937432132572).
                        </div>
                        <div class="flex-shrink-0">
                            15:25 EDT
                        </div>
                    </div>
                </v-timeline-item>
            </v-timeline>
        </v-col>
    </v-row>
</template>
