<template>
  <v-app id="inspire">
    <v-app-bar app extended elevation=1>
      <v-row class="mx-13 mt-14">
        <v-col xs="12" sm="12" md="6" lg="2">
          <v-card color="primary">
            <v-card-title>
              <h4><strong>Dine In : {{ dine_in }}</strong></h4>
            </v-card-title>
          </v-card>
          <v-card-title class="text-left">
            <h4><strong>Total Sales Order : {{ total }}</strong></h4>
          </v-card-title>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="2">
          <v-card color="primary">
            <v-card-title>
              <h4><strong>Take Away : {{ take_away }}</strong></h4>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="5" class="text-center">
          <h1><strong>Order List</strong></h1>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="3" class="text-end">
          <v-btn variant="outlined" color="error" @click="logout">Logout</v-btn>
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
  </v-app>
</template>
<script>
import TheWelcome from '../components/TheWelcome.vue'
import TabAll from '../components/Tabs/All.vue'
import TabDineIn from '../components/Tabs/DineIn.vue'
import TabTakeAway from '../components/Tabs/TakeAway.vue'
import $axios from '@/plugins/api.js'
export default {
  name: 'HomeView',
  components: {
    TheWelcome,
    TabAll,
    TabDineIn,
    TabTakeAway
  },
  data() {
    return {
      tab: null,
      dine_in: 0,
      take_away: 0,
      total: 0
    }
  },

  methods: {
    async getSalesOrder() {
      await $axios.get("/checker/sales-orders", {
      }).then(({ data }) => {
        this.dine_in = data.sales_orders.dine_in_count;
        this.take_away = data.sales_orders.take_away_count;
        this.total = data.sales_orders.all_count;
      });
    },


    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },

  created() {
    this.getSalesOrder();
  }

}
</script>
