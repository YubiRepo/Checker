<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-responsive>
          <v-row>
            <v-card-title>
              <h3><strong>Dine In</strong></h3>
            </v-card-title>
          </v-row>
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
                  <v-col class="text-left mt-3" lg="3">
                    <div class="text-center">
                      <v-dialog v-model="dialog" width="auto">
                        <template v-slot:activator="{ props }">
                          <v-btn color="primary" v-bind="props" icon="mdi-gesture-tap">
                          </v-btn>
                        </template>
                        <v-card width="1000px">
                          <v-card-title class="text-h5 text-center">
                            Summary
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-row>
                              <v-col cols="2">
                                <h4>Order No. </h4>
                                <h4>Table No. </h4>
                              </v-col>
                              <v-col cols="7" class="text-center">
                                <v-row class="pl-15">
                                  <v-col cols="4">
                                    <v-card color="green" class="pa-3">
                                      <v-card-title>
                                        <h1>2</h1>
                                        <h5>Done</h5>
                                      </v-card-title>
                                    </v-card>
                                  </v-col>
                                  <v-col cols="4">
                                    <v-card color="yellow" class="pa-3">
                                      <v-card-title>
                                        <h1>2</h1>
                                        <h5>Not Done</h5>
                                      </v-card-title>
                                    </v-card>
                                  </v-col>
                                  <v-col cols="4">
                                    <v-card color="black" class="pa-3">
                                      <v-card-title>
                                        <h1>4</h1>
                                        <h5>Items</h5>
                                      </v-card-title>
                                    </v-card>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="2" class="text-center ml-15 rounded">
                                <v-card color="secondary" class="pa-3">
                                  <v-card-title>
                                    <h5>Incomplete</h5>
                                  </v-card-title>
                                </v-card>
                              </v-col>
                            </v-row>
                            <v-row>
                              <template>
                                <v-table height="300px">
                                  <thead>
                                    <tr>
                                      <th class="text-left">
                                        Name
                                      </th>
                                      <th class="text-left">
                                        Calories
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="item in desserts" :key="item.name">
                                      <td>{{ item.name }}</td>
                                      <td>{{ item.calories }}</td>
                                    </tr>
                                  </tbody>
                                </v-table>
                              </template>
                            </v-row>
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
                  <v-col class="text-left mt-4" lg="6">
                    <h3>Table No.2</h3>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col v-else class="text-center">
              <div class="card-body cart">
                <div class="col-sm-12 empty-cart-cls text-center">
                  <img src="/src/assets/cart.png" width="100" height="100" class="img-fluid mb-4 mr-3">
                  <!-- <v-icon class="img-fluid mb-4 mr-3">mdi-cart-remove</v-icon> -->
                  <h3><strong>Your Sales Order Is Empty</strong></h3>
                </div>
              </div>
            </v-col>
          </v-row>
          <br>
          <v-divider></v-divider>
          <br>
          <v-row>
            <v-card-title>
              <h3><strong>Take Away</strong></h3>
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
                  <v-col class="text-left mt-3" lg="3">
                    <div class="text-center">
                      <v-dialog v-model="dialog" width="auto">
                        <template v-slot:activator="{ props }">
                          <v-btn color="primary" v-bind="props" icon="mdi-gesture-tap">
                          </v-btn>
                        </template>
                        <v-card width="100%">
                          <v-card-title class="text-h5 text-center">
                            Summary
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-row>
                              <v-col cols="2">
                                <h4>Order No. </h4>
                                <h4>Table No. </h4>
                              </v-col>
                              <v-col cols="7" class="text-center">
                                <v-row class="pl-15">
                                  <v-col cols="4">
                                    <v-card color="green" class="pa-3">
                                      <v-card-title>
                                        <h1>2</h1>
                                        <h5>Done</h5>
                                      </v-card-title>
                                    </v-card>
                                  </v-col>
                                  <v-col cols="4">
                                    <v-card color="yellow" class="pa-3">
                                      <v-card-title>
                                        <h1>2</h1>
                                        <h5>Not Done</h5>
                                      </v-card-title>
                                    </v-card>
                                  </v-col>
                                  <v-col cols="4">
                                    <v-card color="black" class="pa-3">
                                      <v-card-title>
                                        <h1>4</h1>
                                        <h5>Items</h5>
                                      </v-card-title>
                                    </v-card>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="2" class="text-center ml-15 rounded">
                                <v-card color="secondary" class="pa-3">
                                  <v-card-title>
                                    <h5>Incomplete</h5>
                                  </v-card-title>
                                </v-card>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12">
                                <v-table>
                                  <thead color="primary">
                                    <tr>
                                      <th>#</th>
                                      <th width="250">Item Name</th>
                                      <th>Order</th>
                                      <th>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Qty
                                        Out</th>
                                      <th>Order</th>

                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>1</td>
                                      <td>Topoki Jepang</td>
                                      <td>3</td>
                                      <td width="500">
                                        <br>
                                        <v-row>
                                          <v-col cols="2">
                                            <v-btn type="button" color="primary"><strong>-</strong></v-btn>
                                          </v-col>
                                          <v-col cols="3">
                                            <v-text-field type="number" min="1" outlined></v-text-field>
                                          </v-col>
                                          <v-col cols="4" class="float-end">
                                            <v-btn type="button" color="primary"><strong>+</strong></v-btn>
                                          </v-col>
                                        </v-row>
                                      </td>
                                      <td>3</td>
                                    </tr>
                                  </tbody>
                                </v-table>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="green-darken-1"
                              variant="text"
                              @click="dialog = false"
                            >
                              Close Dialog
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                        <br>
                      </v-dialog>
                    </div>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col class="text-left mt-4" lg="6">
                    <h3>Table No.2</h3>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col v-else class="text-center">
              <div class="card-body cart">
                <div class="col-sm-12 empty-cart-cls text-center">
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
  name: 'All',
  components: {
  },
  data() {
    return {
      dialog: false,
      dine_in: [],
      total: 0,
      take_away: [],
    }
  },
  methods: {
    async getSalesOrder() {
      await axios.get("http://192.168.1.57:8169/checker/sales-orders", {
      }).then(({ data }) => {
        this.dine_in = data.sales_orders.dine_in
        this.take_away = data.sales_orders.take_away
        this.total = data.sales_orders.dine_in.length - data.sales_orders.take_away.length
      });
    },
  },

  created() {
    this.getSalesOrder();
  }

}
</script>
