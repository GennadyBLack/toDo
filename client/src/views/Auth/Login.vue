<template>
  <div>
    <div class="bg-light">{{ form }}</div>
    <input type="text" v-model="form.email" />
    <input type="text" v-model="form.password" />
    <button @click="login">register</button>
  </div>
</template>
<script lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { defineComponent } from "vue";
import { gql } from "@apollo/client/core";
interface LoginForm {
  email: string;
  password: string;
}

export default defineComponent({
  setup() {
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
    });
    return { form, login };
  },
});
</script>
