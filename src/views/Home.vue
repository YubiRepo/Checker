<template>
    <v-card>
        <main-layout>
            <v-app-bar title="">
                <v-btn icon @click.stop="drawer = !drawer">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <div class="tool_btns">
                    <v-btn variant="text" append-icon="mdi-chevron-down">
                        <h4><strong><span>USER</span></strong> </h4>
                        <v-menu activator="parent">
                            <v-list nav class="h_a_menu">
                                <v-list-item title="Logout" prepend-icon="mdi-login" @click="logout()" />
                            </v-list>
                        </v-menu>
                    </v-btn>
                </div>
            </v-app-bar>
            <v-main>
                <v-container>
                    <v-row>
                        <v-col class="mt-2" cols="2">
                            <v-card color="primary">
                                <v-card-title class="font">Din In : {{ SalesOrder.dine_in_count }}</v-card-title>
                            </v-card>
                        </v-col>
                        <v-col class="mt-2" cols="2">
                            <v-card color="primary">
                                <v-card-title class="font">Take Away : {{ SalesOrder.take_away_count }}</v-card-title>
                            </v-card>
                        </v-col>
                        <v-col class="mt-2 text-center" cols="4">
                            <v-card-title class="font_size"><b>Order List</b></v-card-title>
                        </v-col>
                        <v-col cols="1"></v-col>
                        <v-col class="mt-2" cols="3">
                            <v-card color="primary">
                                <v-card-title class="font">Total Sales Order : {{ SalesOrder.all_count }}</v-card-title>
                            </v-card>
                        </v-col>
                    </v-row>
                    <br>
                    <br>
                    <v-row>
                        <v-responsive>
                            <v-tabs v-model="tab" color="#FF6565" align-tabs="center">
                                <v-tab value="1">
                                    <v-card color="white" width="200">
                                        <v-card-title class="font_size">
                                            All
                                        </v-card-title>
                                    </v-card>
                                </v-tab>
                                <v-tab value="2">
                                    <v-card color="white" width="200">
                                        <v-card-title class="font_size">
                                            Dine In
                                        </v-card-title>
                                    </v-card>
                                </v-tab>
                                <v-tab value="3">
                                    <v-card color="white" width="200">
                                        <v-card-title class="font_size">
                                            Take Away
                                        </v-card-title>
                                    </v-card>
                                </v-tab>
                            </v-tabs>
                            <v-card-text>
                                <v-window v-model="tab">
                                    <v-window-item value="1">
                                        <TabAll />
                                    </v-window-item>
                                    <v-window-item value="2">
                                        <TabDineIn />
                                    </v-window-item>
                                    <v-window-item value="3">
                                        <TabTakeAway />
                                    </v-window-item>
                                </v-window>
                            </v-card-text>
                        </v-responsive>
                    </v-row>
                </v-container>
                <v-navigation-drawer v-model="drawer" temporary location="right" :width="400">
                    <h3 class="text-center my-3">Remaining Orders</h3>
                    <v-divider></v-divider>
                    <div v-for="row in SalesOrderRemain">

                        <v-list density="compact" nav class="width:100%">
                            <v-list-item style="max-width: auto;font-family:sans-serif ;font-size: large;">
                                {{ row.item_name }}
                            </v-list-item>
                        </v-list>
                        <v-chip class="ma-2" color="success" v-for="no_table in row.tables" :key="no_table">
                            {{ no_table.match(/^-?\d+$/) ? 'Table ' + no_table : 'Take Away' }}
                        </v-chip>
                        <v-divider></v-divider>
                    </div>
                </v-navigation-drawer>
                <v-snackbar v-model="snackbar" :timeout="3000" color="success" location="top">
                    Order has been updated.
                    <template v-slot:actions>
                        <v-btn class="white--text" variant="text" @click="snackbar = false">
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>
            </v-main>
        </main-layout>
    </v-card>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";
import TabAll from "../components/Tabs/All.vue";
import TabDineIn from "../components/Tabs/DineIn.vue";
import TabTakeAway from "../components/Tabs/TakeAway.vue";
import { mapGetters, mapMutations } from "vuex";
import $axios from "@/plugins/api.js";

export default {
    name: "Home",
    components: {
        MainLayout,
        TabAll,
        TabDineIn,
        TabTakeAway,
    },
    data() {
        return {
            tab: null,
            drawer: false,
            snackbar: false,
        };
    },

    methods: {
        ...mapMutations("sales_order", ["SET_SALES_ORDER"]),
        ...mapMutations("sales_order_remain", ["SET_SALES_ORDER_REMAIN"]),
        async getSalesOrder() {
            await $axios
                .get("/checker/sales-orders", {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters["auth/Token"]}`,
                    },
                })
                .then(({ data }) => {
                    this.SET_SALES_ORDER(data.sales_orders);
                })
        },

        async getSalesOrderRemain() {
            await $axios
                .get("/checker/remaining-orders", {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters["auth/Token"]}`,
                    },
                })
                .then(({ data }) => {
                    this.SET_SALES_ORDER_REMAIN(data.sales_orders);
                })
        },

        logout() {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
        },
    },

    computed: {
        ...mapGetters("sales_order", ["SalesOrder"]),
        ...mapGetters("sales_order_remain", ["SalesOrderRemain"]),
        ...mapGetters("auth", ["User"]),
    },
    created() {
        this.getSalesOrder();
        this.getSalesOrderRemain();
    },
    mounted() {
        window.Echo.channel(`branch.${this.User.branch_id}`).listen('SalesOrderUpdated', () => {
            this.snackbar = true;

            this.getSalesOrder();
            this.getSalesOrderRemain();
        })
    }
};
</script>

<style>
.font {
    font-family: Arial, sans-serif;
}

.font_size {
    font-size: 20px;
    font-weight: 900;
    font-family: Arial, sans-serif;
}
</style>
