<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar class="q-mr-md">
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        <span v-if="user?.value?.me?.name"
          >Hello, {{ user?.value?.me?.name }}</span
        >
        {{ isLoged }}
      </q-toolbar-title>
      <q-separator dark vertical />
      <q-btn
        v-if="isLoged"
        stretch
        flat
        label="My TodoList"
        @click="this.$router.replace({ name: 'TodoList' })"
      ></q-btn>
      <q-separator dark vertical />
      <q-btn
        v-if="!isLoged"
        stretch
        flat
        label="Register form"
        @click="this.$router.replace({ name: 'Register' })"
      ></q-btn>
      <q-btn
        v-if="isLoged"
        stretch
        flat
        label="Logout"
        @click="
          () => {
            logout(), this.$router.push({ name: 'Login' });
          }
        "
      ></q-btn>
      <q-separator dark vertical />
      <q-btn
        v-if="!isLoged"
        stretch
        flat
        label="Login form"
        data-attr="login"
        @click="this.$router.replace({ name: 'Login' })"
      >
      </q-btn>
      <q-separator dark vertical />
      <q-btn stretch flat label="Dark Mode" @click="$q.dark.toggle()"></q-btn>
      <q-separator dark vertical />
    </q-toolbar>
  </q-header>
</template>

<script>
import { user, logout } from "@/store/me";
import { computed } from "vue";
import { useQuasar } from "quasar";
export default {
  name: "TheHeader",
  setup() {
    const $q = useQuasar();
    let isLoged = computed(() => {
      let lo = user?.value?.me?.id; //
      let fe = user?.value?.value?.me?.id;
      return lo || fe ? true : false;
    });
    let test = user.value;
    return {
      isLoged,
      logout,
      $q,
      user,
      test,
    };
  },
};
</script>

<style scoped></style>
