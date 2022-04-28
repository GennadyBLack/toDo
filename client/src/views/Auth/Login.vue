<template>
  <div clas="row auth-form bg-teal-3">
    <div class="q-pa-md" style="max-width: 400px">
      <q-input
        standout="bg-teal text-white"
        v-model="form.email"
        label="Email"
      ></q-input>
      <q-input
        standout="bg-teal text-white"
        v-model="form.password"
        label="Password"
      ></q-input>
      <q-btn color="secondary" label="Secondary" @click="login" class="q-m-t-xl"
        >Login</q-btn
      >
    </div>
  </div>
</template>
<script lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { defineComponent } from "vue";
import { gql } from "@apollo/client/core";
import { useRouter } from "vue-router";

interface LoginForm {
  email: string
  password: string
}

export default defineComponent({
  setup() {
    const router = useRouter();
    let form = ref<LoginForm>({ email: "", password: "" });
    const { mutate: login, onDone } = useMutation(
      gql`
        mutation Mutation($email: String!, $password: String!) {
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

    onDone((result) => {
      let token = result?.data?.loginUser?.token;
      console.log(result?.data?.loginUser);
      localStorage.setItem("token", token);
      router.replace({
        name: "TodoList",
        params: { id: result?.data?.loginUser?.user?.id },
      });
    });
    return { form, login };
  },
});
</script>
<style lang="scss"></style>
