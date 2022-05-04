<template>
  <div>
    <q-item-section>
      <q-input
        outlined
        name="task"
        class="col-12 borderless q-mb-md text-h6"
        :model-value="task?.title"
        @change="update({ title: $event, id: task?.id })"
        :class="[
          `${task?.important && !task?.completed ? 'bg-orange-4' : ''}`,
          `${task?.completed ? 'bg-green-4' : ''}`,
          `${!task?.completed && !task?.important ? 'bg-blue-3' : ''}`,
        ]"
      >
        <template #append>
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
            color="transparent"
            icon="delete"
            @click.prevent="deleteTask({ id: task?.id })"
          ></q-btn>
        </template>
      </q-input>
      <q-item-label caption> </q-item-label>
    </q-item-section>
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
interface updateModel {
  title: string;
  completed?: boolean;
  important?: boolean;
  id: number | string;
}
// interface Props {
//   task: TaskModel
//   foo?: number
// }
// через интерфейс
// const props = defineProps<Props>()

//определение пропса через дженерик (минус таких определений, без доп шаманства нельзя добавить дефолтное значение)
const props = defineProps<{ task: TaskModel }>();
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: "refetch"): void;
  // eslint-disable-next-line no-unused-vars
  (e: "reset"): void;
  // eslint-disable-next-line no-unused-vars
  (e: "update", payload: updateModel): void;
}>();

//хз как тут указать тип
const task = toRef(props, "task");
console.log(props);
const $q = useQuasar();

function update(payload: updateModel) {
  emit("update", payload);
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
  emit("reset");
  refetch();
});
</script>
