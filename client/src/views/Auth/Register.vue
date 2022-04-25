<template>
  <div>
    <div class="bg-light">{{ form }}</div>
    <input type="text" v-model="form.email" />
    <input type="text" v-model="form.password" />
    <input type="text" v-model="form.name" />
    <button @click="register({ ...form })">register</button>
  </div>
</template>
<script lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { defineComponent } from "vue";
import { gql } from "@apollo/client/core";
interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default defineComponent({
  setup() {
    let form = ref<RegisterForm>({ email: "", password: "", name: "" });
    const { mutate: register, onDone } = useMutation(
      gql`
        mutation Mutation($name: String!, $email: String!, $password: String!) {
          registerUser(name: $name, email: $email, password: $password) {
            token
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
      let token = result?.data?.registerUser?.token;
      console.log(result?.data?.registerUser);
      localStorage.setItem("token", token);
    });

    return { form, register };
  },
});
</script>
