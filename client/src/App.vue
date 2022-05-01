<template>
  <div class="container">
    <q-layout view="hHh lpR fFf">
      <the-header></the-header>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
    <!-- <button @click="loh({ email: 'test2@test.ru', password: 'tester' })">
      СУПЕРЛОХ
    </button> -->
  </div>
</template>
<script setup>
import { setCurrentUser, profile } from "./store/me";
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import TheHeader from "./views/UI/TheHeader";
const route = useRoute();
const router = useRouter();
watch(route, (value) => {
  if (!profile?.value?.id && value?.meta?.requiresAuth) {
    router.push({ name: "Login" });
  }
});
onMounted(async () => {
  console.log("here");
  await setCurrentUser();
});
</script>
