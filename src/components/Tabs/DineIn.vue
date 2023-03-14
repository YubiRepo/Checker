<template>
  <main-layout>
    <v-main>
      <v-responsive>
        <v-row class="mt-3">
          <v-col v-for="row in SalesOrder.dine_in" cols="2" :key="row.id">
            <v-card height="100%" :color="row.status == 'DONE' ? 'green' : 'yellow'" class="pa-3"
              @click="getSalesOrderDetail(row.id, row.table.no_table)">
              <v-row class="flex mx-auto">
                <v-col class="text-center" lg="12">
                  <h3 class="ma-2 font_card">Order No</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center" lg="12">
                  <h3 class="ma-2 font_number"> {{ row.no_order }}</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center" lg="12">
                  <v-divider :thickness="2"></v-divider>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center" lg="12">
                  <h3 class="ma-2 font_card">Table No. {{ row.table?.no_table }}</h3>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-responsive>
    </v-main>
    <v-dialog v-model="dialog" v-if="dialog" hide-overlay width="60%">
      <v-card>
        <v-row no-gutter>
          <v-col xs="12" sm="12" md="4" lg="4">
          </v-col>
          <v-col xs="12" sm="12" md="4" lg="4" class="text-center">
            <v-card-title class="font_card">
              Summary
            </v-card-title>
          </v-col>
          <v-col xs="12" sm="12" md="4" lg="4" class="text-right">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" variant="flat" @click="dialog = false">
                Close Dialog
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-divider :thickness="2"></v-divider>
        <v-card-text>
          <v-row no-gutter style="justify-content: center;">
            <v-col xs="12" sm="12" md="4" lg="3">
              <v-card height="100%" color="green" class="pa-3">
                <v-row>
                  <v-col class="text-center" lg="12">
                    <h3 class="ma-3 font_number">{{
                      this.detail.reduce(
                        (acc, item) =>
                          acc + item.on_done,
                        0
                      )
                    }}</h3>
                  </v-col>
                </v-row>
                <v-divider :thickness="2"></v-divider>
                <v-row>
                  <v-col class="text-center" lg="12">
                    <h3 class="ma-2 font_card">Done</h3>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col xs="12" sm="12" md="4" lg="3">
              <v-card height="100%" color="yellow" class="pa-3">
                <v-row>
                  <v-col class="text-center" lg="12">
                    <h3 class="ma-3 font_number"> {{
                      this.detail.reduce(
                        (acc, item) => acc + item.qty,
                        0
                      ) -
                      this.detail.reduce(
                        (acc, item) =>
                          acc + item.on_done,
                        0
                      )
                    }}</h3>
                  </v-col>
                </v-row>
                <v-divider :thickness="2"></v-divider>
                <v-row>
                  <v-col class="text-center" lg="12">
                    <h3 class="ma-2 font_card">Not Done</h3>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col xs="12" sm="12" md="4" lg="3">
              <v-card height="100%" color="black" class="pa-3">
                <v-row>
                  <v-col class="text-center" lg="12">
                    <h3 class="ma-3 font_number" style="color:white"> {{ detail.length }}</h3>
                  </v-col>
                </v-row>
                <v-divider :thickness="3" color="white"></v-divider>
                <v-row>
                  <v-col class="text-center" lg="12">
                    <h3 class="ma-2 font_card" style="color:white">Items</h3>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-table>
                <thead style="background-color: green">
                  <tr>
                    <th style="color: white">#</th>
                    <th style="color: white">Item Name</th>
                    <th style="color: white">Order</th>
                    <th style="color: white" class="text-center">Qty Out</th>
                    <th style="color: white" class="text-center">Balance</th>
                    <th style="color: white" class="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(items, index) in detail" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ items.item.name }}</td>
                    <td>{{ items.qty }}</td>
                    <td>
                      <div class="d-flex align-left flex-column pa-6">
                        <v-btn-toggle>
                          <v-btn type="button" icon="mdi-minus" @click="reduceQuantity(index)"></v-btn>
                          <v-text-field type="number" v-model="items.qty_out"
                            @change="calculateQty(index)"></v-text-field>
                          <v-btn type="button" icon="mdi-plus" :disabled="
                            items.qty == items.on_done
                          " @click="addQuantity(index)"></v-btn>
                          <v-btn type="button" variant="flat" style="background-color:#BBDEFB;" @click="check(index)"
                            :disabled="items.qty == items.on_done"><v-icon>mdi-check-outline</v-icon></v-btn>
                        </v-btn-toggle>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex align-left flex-column pa-6">
                        <v-btn-toggle>
                          <v-text-field type="number" v-model="items.on_process" readonly></v-text-field>
                        </v-btn-toggle>
                      </div>
                    </td>
                    <td class="text-center">
                      <v-chip color="green" class="ma-2" v-if="items.status == 'DONE'">
                        {{ items.status }}
                      </v-chip>
                      <v-chip color="black" class="ma-2" text-color="black" v-else>
                        {{ items.status }}
                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <br />
          <v-btn :disabled="loading" color="primary" variant="flat" class="float-end" @click.stop="update">Update Sales
            Order</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </main-layout>
</template>
<script>
import $axios from "@/plugins/api.js";
import MainLayout from "../../layouts/MainLayout.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "DineIn",
  components: {},
  data() {
    return {
      dialog: false,
      header: [],
      detail: [],
      on_process: 0,
      no_table: "",
      snackbar: false,
    };
  },
  methods: {
    ...mapMutations("sales_order", ["SET_SALES_ORDER"]),
    async update() {
      await $axios
        .put("/checker/sales-orders/set-status-detail", this.detail, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/Token"]}`,
          },
        })
        .then(({ data }) => {
          this.dialog = false;
          $axios
            .get("/checker/sales-orders", {
              headers: {
                Authorization: `Bearer ${this.$store.getters["auth/Token"]}`,
              },
            })
            .then(({ data }) => {
              this.SET_SALES_ORDER(data.sales_orders);
            });
        });
    },

    async getSalesOrderDetail(id, no_table) {
      this.dialog = true;
      await $axios
        .get("/checker/sales-orders/" + id, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/Token"]}`,
          },
        })
        .then(({ data }) => {
          this.sales_orders = data.sales_orders.details;
          this.header = data.sales_orders;
          this.no_table = no_table;
          this.detail = data.sales_orders.details;
          this.detail.map((item) => {
            Object.assign(item, {
              qty_out: item.on_done,
              on_process: item.qty - item.on_done,
            });
            item.qty_out = item.on_done;
          });
        });
    },

    addQuantity(index) {
      if (this.detail[index].qty_out >= this.detail[index].qty) {
        return;
      }
      this.detail[index].qty_out += 1;
      this.detail[index].on_process -= 1;
    },

    reduceQuantity(index) {
      if (this.detail[index].qty_out <= 0) {
        return;
      }
      this.detail[index].qty_out -= 1;
      this.detail[index].on_process += 1;
    },

    check(index) {
      if (this.detail[index].qty_out > this.detail[index].qty) {
        this.$toast.error("Qty Out can't be greater than Qty");
        return;
      }
      this.detail[index].on_done = this.detail[index].qty_out;
      this.detail[index].qty_out = this.detail[index].qty;
      this.detail[index].on_process = 0;
      this.detail[index].status = "DONE";
    },

    calculateQty(index) {
      if (this.detail[index].qty_out > this.detail[index].qty) {
        alert("Qty Out can't be greater than Qty");
        this.detail[index].qty_out = this.detail[index].qty;
        return;
      }
      this.detail[index].on_process = this.detail[index].qty - this.detail[index].qty_out;
    },



  },

  mounted() {
    window.Echo.channel(`branch.${this.User.branch_id}`).listen('SalesOrderUpdated', () => {
      this.snackbar = true;
    })
  },

  computed: {
    ...mapGetters("sales_order", ["SalesOrder"]),
    ...mapGetters("auth", ["User"]),
  },
  components: {
    MainLayout,
  },
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

.font_card {
  font-size: 20px;
  font-family: Arial, sans-serif;
  color: #000000;
}

.font_number {
  font-size: 47px;
  font-family: Arial, sans-serif;
  color: #000000;
}
</style>