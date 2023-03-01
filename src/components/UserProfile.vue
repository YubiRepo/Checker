<template>
  <v-menu
    :close-on-content-click="true"
    origin="center center"
    transition="scale-transition"
    :offset-y="true"
    bottom
    left
    ml-1
  >
    <template v-slot:activator="{ on }">
      <v-avatar size="30" class="on_cursor">
        <v-img
          src="@/assets/user_default.png"
          lazy-src="@/assets/user_default.png"
          v-on="on"
        />
      </v-avatar>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img
            src="@/assets/user_default.png"
            lazy-src="@/assets/user_default.png"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ ATTRIBUTE_USER("username") }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <!-- <span color="secondary">{{ ROLE }}</span> -->
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />
      <v-list-item @click.prevent="logout">
        <v-list-item-icon class="mr-2">
          <v-icon>mdi-power</v-icon>
        </v-list-item-icon>
        <v-list-item-title>LOGOUT</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserProfile",
  data() {
    return {
      loginTime: 0,
    };
  },
  methods: {
    logout() {
      this.loginTime = 0;
      this.$axiosCall
        .post(
          "/checker/auth/logout",
          {},
          {
            headers: {
              Authorization: this.TOKEN,
            },
          }
        )
        .then(() => {
          this.$store.dispatch("logout");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$store.dispatch("logout");
          this.$router.push("/login");
        });
    },
  },
  computed: {
    ...mapGetters("auth", {
      AUTHENTICATED: "Authenticated",
      ACCESS_TOKEN: "AccessToken",
      TOKEN: "Token",
      DEFAULT_ROLE: "DefaultRole",
      ROLE: "Role",
      CAN_ACCESS: "can",
      ATTRIBUTE_USER: "AttributeUser",
      USER: "User",
    }),
    APP_NAME() {
      return process.env.VUE_APP_NAME;
    },
  },
  watch: {
    loginTime: {
      handler(value) {
        if (value >= 0) {
          setTimeout(() => {
            this.loginTime =
              this.AUTHENTICATED == true ? this.loginTime + 1 : -1;
          }, 1000);
        } else {
          this.$store.dispatch("logout");
          this.$router.replace("/login");
        }
      },
      immediate: true,
    },
  },
};
</script>
