<template>
  <div class="container">
    <router-link :to="{ name: 'Test' }"> test </router-link>
    <h1>{{ profile?.value?.me?.name || "" }}</h1>
    <div v-ripple>Click Me</div>

    <router-view />
  </div>
</template>
<script>
import { setCurrentUser, profile } from "@/store/me";
export default {
  setup() {
    setCurrentUser();
    return { profile };
  },
};
</script>
