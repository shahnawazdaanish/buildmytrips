<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useAuthStore } from '@/store/auth';
import { router } from '@/router';

const authStore = useAuthStore();
const checkbox = ref(true);
const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        email(value: string) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
            return 'Must be a valid e-mail.';
        },
        password(value: string | any[]) {
            if (value?.length >= 6) return true;
            return 'Password length needs to be at least 6.';
        },
        remember(value: boolean | any[]) {
            if (value) return true;
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

const submit = handleSubmit(async (values: { email: any; password: any; remember: any}) => {
    loading.value = true;
    const { success, content, status } = await authStore.dispatchCreateLogin(values);
    loading.value = false;

    if (!success) {
        console.log(content);
        showErrorAlert(JSON.stringify(content), 5000);
    } else {
        if (content) {
            localStorage.setItem('token', content);
        }
        router.push('/')
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
                <v-label class="font-weight-bold mb-1">Email</v-label>
                <v-text-field
                    v-model="email.value.value"
                    :error-messages="email.errorMessage.value"
                    variant="outlined" hide-details color="primary"></v-text-field>
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
            <v-col cols="12" class="pt-0">
                <div class="d-flex flex-wrap align-center ml-n2">
                    <v-checkbox v-model="checkbox" color="primary" hide-details>
                        <template v-slot:label class="text-body-1">Remeber this Device</template>
                    </v-checkbox>
                    <div class="ml-sm-auto">
                        <RouterLink to="/"
                                    class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
                            Forgot
                            Password ?
                        </RouterLink>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-btn
                    :loading="loading"
                    type="submit"
                    color="primary"
                    size="large" block flat
                >Sign in</v-btn>
            </v-col>
        </v-row>
    </form>
</template>
