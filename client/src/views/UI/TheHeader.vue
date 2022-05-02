<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar class="q-mr-md">
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        <!--        <span v-if="profile?.value?.me?.name"-->
        <!--          >Hello, {{ profile?.value?.me?.name }}</span-->
        <!--        >-->
      </q-toolbar-title>
      <q-separator dark vertical />
      <q-btn
        v-if="isLoged"
        stretch
        flat
        label="My TodoList"
        @click="router.replace({ name: 'TodoList' })"
      ></q-btn>
      <q-separator dark vertical />
      <q-btn
        v-if="!isLoged"
        stretch
        flat
        label="Register form"
        @click="router.replace({ name: 'Register' })"
      ></q-btn>
      <q-btn v-if="isLoged" stretch flat label="Logout" @click="logout"></q-btn>
      <q-separator dark vertical />
      <q-btn
        v-if="!isLoged"
        stretch
        flat
        label="Login form"
        data-attr="login"
        @click="router.replace({ name: 'Login' })"
      >
      </q-btn>
      <q-separator dark vertical />
      <q-btn stretch flat label="Dark Mode" @click="$q.dark.toggle()"></q-btn>
      <q-separator dark vertical />
    </q-toolbar>
  </q-header>
</template>

<script>
import { logout, isLoged } from "@/store/me";

import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
export default {
  name: "TheHeader",
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    // let isLoged = localStorage.getItem("token") !== "null";
    return {
      router,
      isLoged,
      logout,
      $q,
    };
  },
};
</script>

<style scoped></style>
