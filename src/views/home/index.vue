<script setup>
import logo from '@/assets/images/logos/bmt-logo.png';
import bg from '@/assets/images/background/bg7.jpg';
</script>
<template>
    <v-parallax :src="bg" height="800">


        <div class="d-flex flex-column fill-height justify-center mt-15 align-center text-white">
            <h1 class="font-weight-bold mb-4 text-center" style="font-size: 40px;">
                <v-card class="pa-5" style="opacity: .85;" color="#eee">
                    <v-img :src="logo" width="400"/>
                </v-card>
                BuildMyTrips
            </h1>
            <h2 class="subheading mb-10">
                An AI based travel budget and planner app.
            </h2>

            <v-btn size="x-large" to="/auth/login" color="primary">Explore Application</v-btn>
        </div>

    </v-parallax>
</template>
