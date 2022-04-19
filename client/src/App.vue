<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      {{ result }}-asdas
    </nav>
    <router-view />
  </div>
</template>
<script lang="ts">
import { SEARCH_USERS } from "./graphql/documents";
import { useQuery, useResult } from "@vue/apollo-composable";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "App",

  setup() {
    const { result, loading, error } = useQuery(SEARCH_USERS);
    const repositories = useResult(
      result,
      [],
      (data) => data.search && data.search.edges
    );
    return {
      result,
      loading,
      error,
      repositories,
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
