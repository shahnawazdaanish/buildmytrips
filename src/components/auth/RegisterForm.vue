<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useAuthStore } from '@/store/auth';
import { router } from '@/router';

const authStore = useAuthStore();
const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        name(value: string | any[]) {
            if (value?.length >= 4) return true;
            return 'Name length needs to be at least 4.';
        },
        email(value: string) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
            return 'Must be a valid e-mail.';
        },
        password(value: string | any[]) {
            if (value?.length >= 6) return true;
            return 'Password length needs to be at least 6.';
        },
        /*conf_password(value: string | any[]) {
            if (value?.length >= 6) return true;
            return 'Password length needs to be at least 6.';
        }*/
    }
});
const name = useField('name');
const email = useField('email');
const password = useField('password');
const conf_password = useField('conf_password');
const showPassword = ref(false);
const showPasswordConf = ref(false);
let loading = ref(false);
let errorAlert = ref(false);
let errorMessage = ref('');

function showErrorAlert(message: string, time: number) {
    errorMessage.value = message;
    errorAlert.value = true;

    setTimeout(() => {
        errorAlert.value = false;
    }, time);
}

const submit = handleSubmit(async (values: { name: any, email: any; password: any; }) => {
    loading.value = true;
    const { success, content, status } = await authStore.dispatchCreateSignup(values);
    loading.value = false;

    if (!success) {
        console.log(content);
        showErrorAlert(JSON.stringify(content), 5000);
    } else {
        router.push('/auth/login')
    }
});
</script>

<template>
    <v-alert
        v-show="errorAlert"
        density="compact"
        type="error"
        title="Something wrong!"
        :text="errorMessage"
    ></v-alert>
    <form class="pt-6" @submit.prevent="submit">
        <v-row class="d-flex mb-3">
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Name</v-label>
                <v-text-field
                    v-model="name.value.value"
                    :error-messages="name.errorMessage.value"
                    variant="outlined"
                    color="primary">
                </v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Email Address</v-label>
                <v-text-field
                    v-model="email.value.value"
                    :error-messages="email.errorMessage.value"
                    variant="outlined"
                    type="email"
                    color="primary">
                </v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Password</v-label>
                <v-text-field
                    variant="outlined"
                    v-model="password.value.value"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    class="mb-4"
                    :error-messages="password.errorMessage.value"
                    @click:append="showPassword = !showPassword"
                ></v-text-field>
            </v-col>

<!--            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Confirm Password</v-label>
                <v-text-field
                    variant="outlined"
                    v-model="conf_password.value.value"
                    :append-icon="showPasswordConf ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPasswordConf ? 'text' : 'password'"
                    class="mb-4"
                    :error-messages="conf_password.errorMessage.value"
                    @click:append="showPasswordConf = !showPasswordConf"
                ></v-text-field>
            </v-col>-->
            <v-col cols="12">
                <v-btn
                    :loading="loading"
                    type="submit"
                    color="primary"
                    size="large" block flat
                >Sign up</v-btn>
            </v-col>
        </v-row>
    </form>
</template>
