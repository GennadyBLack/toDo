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
import TheHeader from "./views/UI/TheHeader";
// import { defineComponent } from "vue";
export default {
  components: { TheHeader },
  setup() {
    return {};
  },
};

// const { result } = useQuery(ME_QUERY);
</script>
