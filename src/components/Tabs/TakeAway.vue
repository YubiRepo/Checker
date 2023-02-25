<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-responsive>
          <v-row>
            <v-card-title>
            </v-card-title>
          </v-row>
          <v-row class="mt-3">
            <v-col v-for="(row) in take_away" cols="2" v-if="take_away != ''">
              <v-card height="100%" color="yellow" class="pa-3">
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
                    <div class="text-center">
                      <v-dialog v-model="dialog" width="auto">
                        <template v-slot:activator="{ props }">
                          <v-btn color="primary" v-bind="props" icon="mdi-gesture-tap">
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                          </v-card-text>
                          <v-card-actions>
                            <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>
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
  name: 'TakeAway',
  components: {
  },
  data() {
    return {
      dialog: false,
      take_away: [],
    }
  },
  methods: {
    async getSalesOrder() {
      await axios.get("http://192.168.1.57:8169/checker/sales-orders", {
      }).then(({ data }) => {
        this.take_away = data.sales_orders.take_away
      });
    },
  },

  created() {
    this.getSalesOrder();
  }

}
</script>