<template>
    <v-sheet class="bg-deep-purple pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="Email"
            placeholder="Enter your email"
          ></v-text-field>
  
          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Password"
            placeholder="Enter your password"
          ></v-text-field>
  
          <br>
  
          <v-btn
            :disabled="!form"
            :loading="loading"
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
   export default {
    data: () => ({
      form: false,
      email: null,
      password: null,
      loading: false,
    }),

    methods: {
      onSubmit () {
        if (!this.form) return

        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
      required (v) {
        return !!v || 'Field is required'
      },
    },
  }
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