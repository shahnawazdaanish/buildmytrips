<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useSearchStore } from '@/store/search';

const searchStore = useSearchStore();

const loading = ref(false);
const search = ref('');
const selected = ref([]);
const min = ref(50);
const max = ref(5000);
const bpm = ref(40);

const color = computed(() => {
    if (bpm.value < 500) return 'indigo';
    if (bpm.value < 1000) return 'teal';
    if (bpm.value < 3000) return 'green';
    if (bpm.value < 4000) return 'orange';
    return 'red';
});

const decrement = () => {
    bpm.value--;
};
const increment = () => {
    bpm.value++;
};

const next = () => {
    loading.value = true;
    searchStore.searchStepInformation.budget = bpm.value;

    setTimeout(() => {
        bpm.value = 40;
        searchStore.searchStepInformation.currentWindow++;
    }, 1000);
};
</script>

<template>
    <v-row>
        <v-col cols>
            <v-card
                :loading="loading"
                variant="elevated"
                elevation="4"
                class=" mb-4"
            >
                <v-toolbar
                    color="primary"
                    flat
                >

                    <v-toolbar-title>Select your budget</v-toolbar-title>

                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-card-item>

                    <v-card
                        flat
                        class="mx-auto"
                        max-width="600"
                    >
                        <v-toolbar
                            :color="color"
                            flat
                            dense
                        >
                            <v-toolbar-title>
                                <span class="text-subheading">BUDGET</span>
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

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
                                    <!--                                    <v-fade-transition>
                                                                            <v-avatar
                                                                                v-if="isPlaying"
                                                                                :color="color"
                                                                                :style="{
                                                    animationDuration: animationDuration
                                                  }"
                                                                                class="mb-1 v-avatar&#45;&#45;metronome"
                                                                                size="12"
                                                                            ></v-avatar>
                                                                        </v-fade-transition>-->
                                </v-col>
                                <!--                                <v-col class="text-right">-->
                                <!--                                    <v-btn
                                                                        :color="color"
                                                                        theme="dark"
                                                                        icon
                                                                        elevation="0"
                                                                        @click="toggle"
                                                                    >
                                                                        <v-icon size="large" :icon="isPlaying ? 'mdi-pause' : 'mdi-play'"></v-icon>
                                                                    </v-btn>-->
                                <!--                                </v-col>-->
                            </v-row>

                            <v-slider
                                v-model="bpm"
                                :color="color"
                                track-color="grey"
                                :min="min"
                                :max="max"
                                :step="1"
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
                    </v-card>
                </v-card-item>


                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        :disabled="bpm < 60"
                        :loading="loading"
                        color="primary"
                        variant="flat"
                        @click="next"
                    >
                        Next
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>