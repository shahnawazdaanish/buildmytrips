<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useSearchStore } from '@/store/search';

const searchStore = useSearchStore();
const loading = ref(false)

onMounted(async () => {
    loading.value = true;
    const { status, content } = await searchStore.dispatchGetPrevHistory();
    loading.value = false;
});
</script>

<template>
    <v-card
        class="mx-auto mb-10"
        color="primary"
        :loading = 'loading'
        variant="elevated"
    >
        <v-card-item>
            <div>
                <div class="text-overline mb-1">
                    Search
                </div>
                <div class="text-h6 mb-1">
                    Previous History
                </div>
                <div class="text-caption">Find a list of your previous searches</div>
            </div>
        </v-card-item>
    </v-card>
    <v-table>
        <thead>
        <tr>
            <th class="text-left">
                Title
            </th>
<!--            <th class="text-left">-->
<!--                Link-->
<!--            </th>-->
            <th class="text-left">
                Budget
            </th>
            <th class="text-left">
                Time
            </th>
            <th class="text-left">
                Location
            </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in searchStore.previousHistory"
            :key="item.title"
        >
            <td>{{ item.title}}</td>
<!--            <td>{{ item.link}}</td>-->
            <td>{{ item.budget }} euros</td>
            <td>{{ item.searched_at }}</td>
            <td>{{ item.location }}</td>
        </tr>
        </tbody>
    </v-table>
</template>