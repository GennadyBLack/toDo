<template>
  <div class="container">
    <q-layout view="hHh lpR fFf">
      <the-header :user="user"></the-header>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { ME_QUERY } from "@/graphql/documents";
import { setUser, user } from "./store/me";
import TheHeader from "./views/UI/TheHeader";
import { useQuery } from "@vue/apollo-composable";
export default {
  components: { TheHeader },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async fetchUser() {
      let { result } = await useQuery(ME_QUERY);
      this.user = await result;
      setUser(result);
      console.log(typeof user);
    },
  },
  computed: {
    route() {
      return this.$route;
    },
    token() {
      return localStorage.getItem("token") !== "null";
    },
  },
  created() {
    this.fetchUser();
  },
  watch: {
    route() {
      if (!this.user && this?.route?.meta?.requiresAuth) {
        this.$router.push({ name: "Login" });
      } else if (!this?.route?.meta?.requiresAuth) {
        return;
      } else {
        return;
      }
    },
  },
};
</script>
