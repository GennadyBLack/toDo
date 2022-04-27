<template>
  <div>
    <q-item
      class="q-mb-md"
      tag="label"
      :class="[
        `${task?.important && !task?.completed ? 'bg-red-4' : ''}`,
        `${task?.completed ? 'bg-green-4' : ''}`,
        `${!task?.completed && !task?.important ? 'bg-grey-4' : ''}`,
      ]"
    >
      <q-item-section>
        <q-input
          class="col-12 borderless"
          :model-value="task?.title"
          @change="update({ title: $event, id: task?.id })"
        >
          <template #after>
            <q-checkbox
              class="q-mr-sm"
              :model-value="task?.completed"
              checked-icon="task_alt"
              size="lg"
              unchecked-icon="task_alt_border"
              @update:model-value="update({ completed: $event, id: task?.id })"
            ></q-checkbox>
            <q-checkbox
              class="q-mr-sm"
              :model-value="task?.important"
              checked-icon="star"
              size="lg"
              unchecked-icon="star_border"
              @update:model-value="update({ important: $event, id: task?.id })"
            ></q-checkbox>
            <q-btn
              class="glossy"
              round
              color="red"
              icon="delete"
              @click.prevent="deleteTask({ id: task?.id })"
            ></q-btn>
          </template>
        </q-input>
        <q-item-label caption> </q-item-label>
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
