<template>
  <div>
    <div><div v-ripple class="pink-12">Click Me</div></div>
    <div>
      <p class="deep-orange-10">...asdasdasd.</p>
      <q-bogus size="24px" />
      <q-btn
        @click="$q.notify('My message')"
        color="primary"
        label="Show a notification"
      />
      <q-bogus :infinite="myInfiniteVariable" />
      <q-btn
        @click="showNotification"
        color="purple-12"
        class="pink-12"
        label="Show another notification"
      />
    </div>
    <q-icon name="cloud" />
    <q-bogus :infinite="true" />
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const myInfiniteVariable = ref(false);

    function showNotification() {
      $q.notify("Some other message");
    }
    return {
      showNotification,
      myInfiniteVariable,
    };
  },
});
</script>
