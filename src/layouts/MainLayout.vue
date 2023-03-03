<template>
  <v-app id="inspire">
    <slot></slot>
  </v-app>
</template>

<script>
export default {
  name: "App",
  created() {
    if (!this.$store.getters["auth/Authenticated"]) {
      this.$router.push("/login");
    }
  },
};
</script>