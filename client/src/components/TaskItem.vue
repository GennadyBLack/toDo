<template>
  <div>
    <q-item class="bg-orange-4 q-mb-md" tag="label">
      <q-item-section>
        <q-item-label> {{ task?.title }}</q-item-label>
        <q-item-label caption>
          <q-checkbox
            :model-value="task?.completed"
            @update:model-value="update({ completed: $event, id: task?.id })"
          ></q-checkbox>
          <q-checkbox
            :model-value="task?.important"
            @update:model-value="update({ important: $event, id: task?.id })"
          ></q-checkbox>
          <q-btn
            class="glossy"
            round
            color="red"
            icon="delete"
            @click.prevent="deleteTask({ id: task?.id })"
          ></q-btn>
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>
<script lang="ts" setup>
import { useMutation } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
import { useQuasar } from "quasar";
import { defineProps, toRef, defineEmits } from "vue";

interface TaskModel {
  title: string | number;
  important: boolean;
  completed: boolean;
}

const props = defineProps({ task: Object as () => TaskModel });
const emit = defineEmits(["update", "refetch"]);
const task = toRef(props, "task");
console.log(props);
const $q = useQuasar();

function update(e: any) {
  emit("update", e);
}
function refetch() {
  emit("refetch");
}

const { mutate: deleteTask, onDone } = useMutation(
  //в gql описываем поля, которые нужно вернуть
  gql`
    mutation deleteTask($id: Int) {
      deleteTask(id: $id)
    }
  `
);

onDone(() => {
  console.log(deleteTask);
  $q.notify("Task was successfuly deleted");
  refetch();
});
</script>
