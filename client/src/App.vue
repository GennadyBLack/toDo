<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
    <br />
    {{ profile.value.me.name }}
  </div>
</template>

<script>
import { setCurrentUser, profile, test } from "./store/me";
import { ME_QUERY } from "./graphql/documents";
import { useQuery, useResult } from "@vue/apollo-composable";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    setCurrentUser();
    return {
      profile,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
