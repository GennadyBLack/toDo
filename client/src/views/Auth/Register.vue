<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-input
      standout="bg-teal text-white"
      v-model="form.name"
      label="Name"
    ></q-input>
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
    <q-btn
      color="secondary"
      label="Secondary"
      @click="register"
      class="q-m-t-xl"
      >Register</q-btn
    >
  </div>
</template>
<script lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { defineComponent } from "vue";
import { gql } from "@apollo/client/core";
import { useQuasar } from "quasar";
import {useRouter} from "vue-router"
interface RegisterForm {
  name: string
  email: string
  password: string
}

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const router = useRouter();
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
      $q.notify("You've registered successfully");
      router.replace({name: "Login"})
    });

    return { form, register };
  },
});
</script>
