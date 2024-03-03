<template>
    <div class="logo">
        <RouterLink to="/">
            <v-img :src="logo" width="200"/>
        </RouterLink>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import logo from '@/assets/images/logos/bmt-logo.png'

const primary = ref('rgb(var(--v-theme-primary))');
const secondary = ref('rgb(var(--v-theme-secondary))');
</script>
