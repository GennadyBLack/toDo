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
import { setCurrentUser, profile } from "@/store/me";
import { onUpdated, onMounted } from "vue";
import TheHeader from "./views/UI/TheHeader";

onMounted(async () => {
  await setCurrentUser();
  console.log(profile);
});
onUpdated(() => {
  console.log("i updated");
});
</script>
