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
        stretch
        flat
        label="Register form"
        @click="router.replace({ name: 'Register' })"
      ></q-btn>
      <q-separator dark vertical />
      <q-btn
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
// TODO: хранение id
// TODO: условное отображение регистрации/логина/ссылки на туду
// TODO: имя юзера в хедере
import { useRouter } from "vue-router";
export default {
  name: "TheHeader",
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
};
</script>

<style scoped></style>
