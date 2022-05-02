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
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { defineComponent } from "vue";
import { gql } from "@apollo/client/core";
import { useRouter } from "vue-router";
import { setCurrentUser } from "@/store/me.js";

interface LoginForm {
  email: string;
  password: string;
}

export default defineComponent({
  setup() {
    const router = useRouter();
    let form = ref<LoginForm>({ email: "", password: "" });
    const {
      mutate: login,
      onDone,
      onError,
    } = useMutation(
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
    onDone(async (result) => {
      try {
        const token: string = result?.data?.loginUser?.token;
        console.log(result?.data?.loginUser, "getLoginUser");
        localStorage.setItem("token", token);
        await setCurrentUser();
        await router.replace({
          name: "TodoList",
        });
      } catch (e) {
        throw new Error(e);
      }
    });
    onError((error) => {
      console.error(error);
    });
    return { form, login };
  },
});
</script>
<style lang="scss"></style>
