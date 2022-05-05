<template>
  <div>
    <div>
      <div v-ripple class="pink-12 inset-shadow mobile fixed-top">Click Me</div>
    </div>
    <div class="column">
      <p class="deep-orange-10 inset-shadow">...asdasdasd.</p>
      <q-bogus size="24px" />
      <q-btn
        @click="$q.notify('My message')"
        color="primary"
        label="Show a notification"
      />
      <q-bogus :infinite="myInfiniteVariable" />
      <q-btn
        @click="showNotification"
        color="purple-12 shadow-up-2 inset-shadow"
        class="pink-12"
        label="Show another notification"
      />

      <q-icon name="cloud" />
      <q-bogus :infinite="true" />
      <div>First column</div>
      <div>Second column</div>
      <div>Third column</div>
      <div class="row">
        <div class="col-3">1</div>
        <div class="col-6">2</div>
        <div class="col-3">1</div>
      </div>
    </div>
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
