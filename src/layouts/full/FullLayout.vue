<script setup lang="ts">
import { RouterView } from 'vue-router';
// import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
// import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import MainView from './Main.vue';
import bg from '@/assets/images/background/bg4.jpg';
</script>

<template>
    <v-locale-provider >
        <v-app>
            <!-- <VerticalSidebarVue />
            <VerticalHeaderVue  /> -->
          <v-parallax :src="bg">
            <MainView />
            <v-main>
                <v-container fluid class="page-wrapper">
                    <div class="maxWidth">
                        <RouterView />
                    </div>
                </v-container>
            </v-main>
          </v-parallax>
        </v-app>
    </v-locale-provider>
</template>
