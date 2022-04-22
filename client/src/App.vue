<template>
  <div class="container">
    <!--    <router-link :to="{ name: 'Test' }"> test </router-link>-->
    <!--    <h4>{{ profile?.value?.me?.name || "" }}</h4>-->
    <!--    <h4>{{ todos }}</h4>-->

    <!--    <div v-ripple>Click Me</div>-->
    <button @click="loh({ email: 'test2@test.ru', password: 'tester' })">
      СУПЕРЛОХ
    </button>
  </div>
</template>
<script>
import { setCurrentUser, profile } from "@/store/me";
import allTodos from "@/store/todo";
// import { LOGIN_USER } from "@/graphql/documents";
import { useMutation } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
export default {
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
