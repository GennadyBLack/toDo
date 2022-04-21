<template>
  <h1>{{ profile.value.me.name }}</h1>
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
