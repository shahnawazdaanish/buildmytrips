<script>
export default {
    data () {
        return {
            tab: null,
            items: [
                'Personal Details', 'Change Password', 'Billings',
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    },
}
</script>


<template>

    <v-row>
        <v-col cols="4">

        </v-col>
        <v-col cols="8">
            <v-card>
                <v-toolbar
                    color="purple"
                    image="https://img.freepik.com/free-vector/realistic-travel-background-with-elements_52683-77784.jpg"
                >
                    <v-toolbar-title class="font-weight-bold">My Account</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>

                    <template v-slot:extension>
                        <v-tabs
                            v-model="tab"
                            align-tabs="title"
                        >
                            <v-tab
                                v-for="item in items"
                                :key="item"
                                :value="item"
                            >
                                {{ item }}
                            </v-tab>
                        </v-tabs>
                    </template>
                </v-toolbar>

                <v-window v-model="tab">
                    <v-window-item
                        v-for="item in items"
                        :key="item"
                        :value="item"
                    >
                        <v-card flat>
                            <v-card-text v-text="text"></v-card-text>
                        </v-card>
                    </v-window-item>
                </v-window>
            </v-card>
        </v-col>
    </v-row>
</template>