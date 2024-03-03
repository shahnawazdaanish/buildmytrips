<script setup lang="ts">


import { ref } from 'vue';
import SearchInterest from '@/components/search/SearchInterest.vue';
import { useSearchStore } from '@/store/search';
import SearchBudget from '@/components/search/SearchBudget.vue';

const searchStore = useSearchStore();
let loading = ref(false);
</script>

<template>
    <v-row>
        <v-col>
            <v-window
                v-model="searchStore.searchStepInformation.currentWindow"
            >
                <v-window-item
                    :key="`card-1`"
                >
                    <SearchInterest/>
                </v-window-item>

                <v-window-item
                    :key="`card-2`"
                >
                    <SearchBudget/>
                </v-window-item>
            </v-window>
        </v-col>
    </v-row>
</template>