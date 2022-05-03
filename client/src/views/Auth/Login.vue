<template>
  <div clas="row auth-form bg-teal-3">
    <div class="q-pa-md" style="max-width: 400px" data-attr="login-form">
      <q-input
        standout="bg-teal text-white"
        v-model="form.email"
        label="Email"
        name="Email"
      ></q-input>
      <q-input
        standout="bg-teal text-white"
        v-model="form.password"
        label="Password"
        name="Password"
      ></q-input>
      <q-btn
        color="secondary"
        label="Login"
        type="submit"
        @click="login"
        class="q-m-t-xl"
      ></q-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { useMutation, useQuery } from "@vue/apollo-composable";
import { ref } from "vue";
import { defineComponent } from "vue";
import { gql } from "@apollo/client/core";
import { useRouter } from "vue-router";
/* tslint:disable */ // @ts-ignore: Unreachable code error

import { setUser } from "../../store/me.js";

interface LoginForm {
  email: string;
  password: string;
}

export default defineComponent({
  setup() {
    const router = useRouter();
    let form = ref<LoginForm>({ email: "", password: "" });
    const { mutate: login, onDone } = useMutation(
      gql`
        mutation loginUser($email: String!, $password: String!) {
          loginUser(email: $email, password: $password) {
            token
            user {
              id
            }
          }
        }
      `,
      () => ({
        variables: {
          ...form.value,
        },
      })
    );
    const data = useQuery(gql`
      query GetMe {
        me {
          email
          name
          id
        }
      }
    `).result;
    console.log(data, "DATA");

    onDone((result) => {
      try {
        console.log(result?.data?.loginUser.user, "ttt");
        let pre = { me: { ...result?.data?.loginUser.user } };
        setUser(pre);
        let token = result?.data?.loginUser?.token;
        localStorage.setItem("token", token);
        router.replace({
          name: "TodoList",
        });
      } catch (e) {
        throw new Error(e);
      }
    });
    return { form, login, onDone };
  },
});
</script>
<style lang="scss"></style>
