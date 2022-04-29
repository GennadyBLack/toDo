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
import { setCurrentUser, profile } from "@/store/me";
import allTodos from "@/store/todo";
// import { LOGIN_USER } from "@/graphql/documents";
import { useMutation } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
import TheHeader from "./views/UI/TheHeader";
export default {
  components: { TheHeader },
  setup() {
    setCurrentUser();
    const todos = allTodos();
    const { mutate: loh } = useMutation(gql`
      mutation Mutation($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
          token
        }
      }
    `);
    // loh({
    //   email: "test@test.ru",
    //   password: "tester",
    // });
    return { profile, todos, loh };
  },
};
</script>
