<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
      </q-toolbar-title>
      <q-separator dark vertical />
      <q-btn
        v-if="!profile?.value?.me?.id"
        stretch
        flat
        label="Register form"
        @click="router.replace({ name: 'Register' })"
      ></q-btn>
      <q-btn
        v-if="profile?.value?.me?.id"
        stretch
        flat
        label="Logout"
        @click="logout"
      ></q-btn>
      <q-separator dark vertical />
      <q-btn
        v-if="!profile?.value?.me?.id"
        stretch
        flat
        label="Login form"
        @click="router.replace({ name: 'Login' })"
      ></q-btn>
      <q-separator dark vertical />
    </q-toolbar>
  </q-header>
</template>

<script>
import { profile, logout } from "@/store/me";

import { useRouter } from "vue-router";
export default {
  name: "TheHeader",
  setup() {
    const router = useRouter();
    return {
      router,
      profile,
      logout,
    };
  },
};
</script>

<style scoped></style>
