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
<script>
// import { useQuery } from "@vue/apollo-composable";
// import { ME_QUERY } from "./graphql/documents";
import { setCurrentUser, isLoged } from "./store/me";
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import TheHeader from "./views/UI/TheHeader";
import { defineComponent } from "vue";
const route = useRoute();
const router = useRouter();
watch(route, (value) => {
  if (!isLoged && value?.meta?.requiresAuth) {
    router.push({ name: "Login" });
  }
});
// onMounted(async () => {
//   console.log("here");
//   await setCurrentUser();
// });
export default defineComponent({
  components: { TheHeader },
  setup() {
    onMounted(async () => {
      console.log("here");
      await setCurrentUser();
    });
    return {};
  },
});

// const { result } = useQuery(ME_QUERY);
</script>
