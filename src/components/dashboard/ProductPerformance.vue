<script setup lang="ts">
import {productPerformance} from '@/data/dashboard/dashboardData';
import PlayButton from '@/components/shared/PlayButton.vue';
</script>

<template>
    <v-card variant="elevated" elevation="1" class="">
        <v-card-item class="pa-6">
        <v-card-title class="text-h5 pt-sm-2 pb-7">Recent Quests</v-card-title>
        <v-table class="month-table">
            <thead>
                <tr>
                    <th class="text-subtitle-1 font-weight-bold">Title</th>
                    <th class="text-subtitle-1 font-weight-bold">Offer</th>
                    <th class="text-subtitle-1 font-weight-bold">Status</th>
                    <th class="text-subtitle-1 font-weight-bold text-right">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in productPerformance" :key="item.id" class="month-item">
                    <td>
                        <div class="">
                                <h6 class="text-subtitle-1 font-weight-bold">{{ item.title }}</h6>
                                <div class="text-13 mt-1 text-muted">{{ item.subtitle }}</div>
                        </div>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted">{{ item.offer }}</h6>
                    </td>
                    <td>
                        <v-chip  :class="'text-body-1 bg-' + item.statuscolor " color="white"  size="small" >{{
                            item.status
                        }}</v-chip>
                    </td>
                    <td>
                        <h6 class="text-h6 text-right"><PlayButton :disabled="!item.isPlayable">Play</PlayButton></h6>
                    </td>
                </tr>
            </tbody>
        </v-table>
        </v-card-item>
    </v-card>
</template>
