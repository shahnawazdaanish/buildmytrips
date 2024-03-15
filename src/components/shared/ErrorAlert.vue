<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

const props = defineProps({
    title: String,
    message: [Object, String]
});
const emit = defineEmits(['resetError']);

const alert = ref(true);
const showListTitle = (item) => {
    if (typeof item === 'object') {
        return item[0] ?? item;
    } else {
        return item;
    }
}

watch(alert, async (newAlert, oldAlert) => {
    if (newAlert === false)
        emit('resetError');
})

onMounted(() => {
    setTimeout(() => {
        alert.value = false;
    }, 4000)
})
</script>

<template>
    <v-alert
        border="top"
        type="warning"
        variant="flat"
        v-model="alert"
        close-label="Close Alert"
        :title="title"
        closable
        prominent
    >
        <v-list  bg-color="warning" density="compact" v-if="typeof message === 'object'">
            <v-list-item
                v-for="(m, index) in message"
                :key="index"
            >
                <v-list-item>{{ showListTitle(m) }}</v-list-item>
            </v-list-item>
        </v-list>
        <v-card-text v-if="typeof message === 'string'">{{ message }}</v-card-text>
    </v-alert>
</template>



