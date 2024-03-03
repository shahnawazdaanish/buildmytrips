<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useSearchStore } from '@/store/search';

const searchStore = useSearchStore();

onMounted(async () => {
    loading.value = true;
    const { status, content } = await searchStore.dispatchGetGenericSearchInterests()
    loading.value = false;
})

const loading = ref(false);
const search = ref('');
const selected = ref([]);


const next = () => {
    loading.value = true;
    searchStore.searchStepInformation.selectedInterests = selected.value

    setTimeout(() => {
        search.value = ''
        selected.value = []
        loading.value = false
        searchStore.searchStepInformation.currentWindow++
    }, 1000)
}

const allSelected = computed(() => {
    return selected.value.length === searchStore.searchInterests.length
});

const categories = computed(() => {
    const searchText = search.value.toLowerCase()

    if (!searchText) return searchStore.searchInterests

    return searchStore.searchInterests.filter(item => {
        const text = item.title.toLowerCase()

        return text.indexOf(searchText) > -1
    })
});

const  selections = computed(() => {
    const selections: any[] = []

    for (const selection of selected.value) {
        selections.push(selection)
    }

    return selections
});
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

                    <v-toolbar-title>Your interests for this search</v-toolbar-title>

                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-container>
                    <v-row
                        align="center"
                        justify="start"
                    >
                        <v-col
                            v-for="(selection, i) in selections"
                            :key="selection.title"
                            cols="auto"
                            class="py-1 pe-0"
                        >
                            <v-chip
                                size="x-large"
                                :disabled="loading"
                                closable
                                @click:close="selected.splice(i, 1)"
                            >
                                <v-icon
                                    :icon="selection.icon"
                                    start
                                ></v-icon>

                                {{ selection.title }}
                            </v-chip>
                        </v-col>

                        <v-col
                            v-if="!allSelected"
                            cols="12"
                        >
                            <v-text-field
                                ref="searchField"
                                v-model="search"
                                hide-details
                                label="Search"
                                single-line
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>

                <v-divider v-if="!allSelected"></v-divider>

                <v-list>
                    <template v-for="item in categories">
                        <v-list-item
                            v-if="!selected.includes(item)"
                            :key="item.title"
                            :disabled="loading"
                            @click="selected.push(item)"
                        >
                            <template v-slot:prepend>
                                <v-icon
                                    :disabled="loading"
                                    :icon="item.icon"
                                ></v-icon>
                            </template>

                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item>
                    </template>
                </v-list>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        :disabled="!selected.length"
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