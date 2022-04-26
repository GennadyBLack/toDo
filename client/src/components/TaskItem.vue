<template>
  <div>{{ props }}</div>
</template>
<script lang="ts" setup>
import { useMutation } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
import { useQuasar } from "quasar";

interface TaskModel {
  title: string | number;
  important: boolean;
  completed: boolean;
}

const props = defineProps<TaskModel>();
const $q = useQuasar();
const { mutate: deleteTask, onDone } = useMutation(
  //в gql описываем поля, которые нужно вернуть
  gql`
    mutation Mutation($deleteTaskId: Int) {
      deleteTask(id: $deleteTaskId) {
        id
      }
    }
  `,
  //здесь то, что передаем в резолвер в данном случае
  () => ({
    variables: {
      deleteTaskId: 1,
    },
  })
);

onDone(() => {
  $q.notify("Task was successfuly deleted");
});
</script>
