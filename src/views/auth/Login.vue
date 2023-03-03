<template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form ref="form_login" lazy-validation>
        <v-text-field
          v-model="form_login.username"
          class="mb-2"
          clearable
          label="Username"
          placeholder="Enter your username"
          :rules="rule_username"
        ></v-text-field>

        <v-text-field
          v-model="form_login.password"
          density="compact"
          type="password"
          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br />
        <v-btn
          :loading="btnLoading"
          :disabled="btnLoading"
          @click.prevent="handleLogin"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>
  
  <script>
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
export default {
  name: "Login",
  data: () => ({
    isLoading: false,
    btnLoading: false,
    form_valid: true,
    form_error: false,
    form_login: {
      username: "",
      password: "",
    },
    rule_username: [
      (v) => !!v || "Username is required",
      (v) =>
        (v && v.length <= 10) || "Username must be less than 10 characters",
    ],
    rule_password: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length <= 10) || "Password must be less than 10 characters",
    ],
  }),

  created() {
    if (this.$store.getters["auth/Authenticated"]) {
      this.$router.push("/home");
    }
  },

  methods: {
    ...mapActions("auth", ["submit"]),

    handleLogin() {
      this.submit(this.form_login).then(() => {
        if (this.$store.getters["auth/Authenticated"]) {
          this.$router.push("/home");
        }
      });
    },
  },
};
</script>
  
  <style scoped>
.auth-wrapper {
  min-block-size: calc(var(--vh, 1vh) * 100);
}

.auth-footer-mask {
  position: absolute;
  inset-block-end: 0;
  min-inline-size: 100%;
}

.auth-card {
  width: 17%;
  z-index: 1 !important;
}

.auth-footer-start-tree,
.auth-footer-end-tree {
  position: absolute;
  z-index: 1;
}

.auth-footer-start-tree {
  inset-block-end: 0;
  inset-inline-start: 0;
}

.auth-footer-end-tree {
  inset-block-end: 0;
  inset-inline-end: 0;
}

.auth-illustration {
  z-index: 1;
}

.auth-logo {
  position: absolute;
  z-index: 1;
  inset-block-start: 2rem;
  inset-inline-start: 2.3rem;
}

.auth-bg {
  background-color: rgb(var(--v-theme-surface));
}
</style>