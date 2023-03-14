<template>
  <main-layout>
    <v-app-bar app extended elevation="1">
      <v-row class="mx-13 mt-14">
        <v-col xs="12" sm="12" md="6" lg="2">
          <v-card color="primary">
            <v-card-title>
              <h4>
                <strong>Dine In : {{ SalesOrder.dine_in_count }}</strong>
              </h4>
            </v-card-title>
          </v-card>
          <v-card-title class="text-left">
            <h4>
              <strong>Total Sales Order : {{ SalesOrder.all_count }}</strong>
            </h4>
          </v-card-title>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="2">
          <v-card color="primary">
            <v-card-title>
              <h4>
                <strong>Take Away : {{ SalesOrder.take_away_count }}</strong>
              </h4>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="5" class="text-center">
          <h1><strong>Order List</strong></h1>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="3" class="text-end">
          <div class="tool_btns">
            <v-btn color="primary" variant="flat" @click.stop="drawer = !drawer">
              Check Item
            </v-btn>
            <v-btn variant="text" />
            <v-btn variant="text" append-icon="mdi-chevron-down" class="mr-2">
              <v-avatar size="x-small" class="avatarmr-2">
                <v-img src="" alt="user"></v-img>
              </v-avatar>
              <h4><strong><span>USER</span></strong> </h4>
              <v-menu activator="parent">
                <v-list nav class="h_a_menu">
                  <v-list-item title="Logout" prepend-icon="mdi-login" @click="logout()" />
                </v-list>
              </v-menu>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-responsive>
          <v-card>
            <v-tabs v-model="tab" color="#FF6565" align-tabs="center">
              <v-tab value="1">
                <v-card color="white" width="200">
                  <v-card-title>
                    <h3><strong>All</strong></h3>
                  </v-card-title>
                </v-card>
              </v-tab>
              <v-tab value="2">
                <v-card color="white" width="200">
                  <v-card-title>
                    <h3><strong>Dine In</strong></h3>
                  </v-card-title>
                </v-card>
              </v-tab>
              <v-tab value="3">
                <v-card color="white" width="200">
                  <v-card-title>
                    <h3><strong>Take Away</strong></h3>
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
          </v-card>
        </v-responsive>
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="drawer" temporary location="right" :width="400">
      <v-list density="compact" nav class="width:100%">
        <v-list-item prepend-icon="mdi-view-dashboard" style="max-width: auto;" title="Home" value="home"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main style="width: 500px"></v-main>
    <v-snackbar v-model="snackbar" :timeout="3000" color="success" location="top">
      Order has been updated.

      <template v-slot:actions>
        <v-btn class="white--text" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </main-layout>
</template>
<script>
import TheWelcome from "../components/TheWelcome.vue";
import TabAll from "../components/Tabs/All.vue";
import TabDineIn from "../components/Tabs/DineIn.vue";
import TabTakeAway from "../components/Tabs/TakeAway.vue";
import $axios from "@/plugins/api.js";
import { mapGetters, mapMutations } from "vuex";
import MainLayout from "../layouts/MainLayout.vue";

export default {
  name: "HomeView",
  components: {
    TheWelcome,
    TabAll,
    TabDineIn,
    TabTakeAway,
    MainLayout,
  },
  data() {
    return {
      tab: null,
      snackbar: false,
      drawer: false,
    };
  },
  methods: {
    ...mapMutations("sales_order", ["SET_SALES_ORDER"]),
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

    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },

  computed: {
    ...mapGetters("sales_order", ["SalesOrder"]),
    ...mapGetters("auth", ["User"]),
  },
  created() {
    this.getSalesOrder();
  },
  mounted() {
    window.Echo.channel(`branch.${this.User.branch_id}`).listen('SalesOrderUpdated', () => {
      this.snackbar = true;

      this.getSalesOrder();
    })
  }
};
</script>
<style>
.v-navigation-drawer--end.v-locale--is-rtl,
.v-locale--is-rtl .v-navigation-drawer--end {
  left: auto !important;
}
</style>
