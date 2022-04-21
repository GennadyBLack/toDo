<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Auth",
  setup() {
    let component = ref<string>("LoginForm");
    let setComponent = (value: string): void => {
      component.value = value;
    };
    return {
      component,
      setComponent,
    };
  },
});
</script>

<template>
  <component :is="component" />
</template>
