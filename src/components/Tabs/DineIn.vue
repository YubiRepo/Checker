<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-responsive>
          <v-row class="mt-3">
            <v-col v-for="(row) in dine_in" cols="2" v-if="dine_in != ''">
              <v-card height="100%" color="green" class="pa-3">
                <v-row>
                  <v-col class="text-center mt-4" lg="5">
                    <h4>Order No</h4>
                    <v-card-text style="font-size:3em">
                      {{ row.no_order }}
                    </v-card-text>
                  </v-col>
                  <v-col class="text-right mt-4" lg="4">
                    <h5>Tab For Detail</h5>
                  </v-col>
                  <v-col class="text-center mt-3" lg="3">
                    <v-btn icon="mdi-gesture-tap" color="primary"></v-btn>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col class="text-center mt-4" lg="5">
                    <h3>Table No.{{ row.table.no_table }}</h3>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col v-else class="text-center">
              <div class="card-body cart">
                <div class="col-sm-12 empty-cart-cls text-center" >
                  <img src="/src/assets/cart.png" width="100" height="100" class="img-fluid mb-4 mr-3">
                  <!-- <v-icon class="img-fluid mb-4 mr-3">mdi-cart-remove</v-icon> -->
                  <h3><strong>Your Sales Order Is Empty</strong></h3>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-responsive>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import axios from 'axios'
export default {
  name: 'DineIn',
  components: {
  },
  data() {
    return {
      tab: null,
      dine_in: [],
    }
  },
  methods: {
    async getSalesOrder() {
      await axios.get("http://192.168.1.57:8169/checker/sales-orders", {
      }).then(({ data }) => {
        this.dine_in = data.sales_orders.dine_in
      });
    },
  },

  created() {
    this.getSalesOrder();
  }

}
</script>