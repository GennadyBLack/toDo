<template>
  <div class="main-wrapper q-pa-md">
    <q-input filled v-model="taskForm.title" label="text To Do"></q-input>
    <!-- <input v-model="taskTitle" type="text" /> -->
    <div class="q-pa-md">
      <q-checkbox v-model="taskForm.important" label="important"></q-checkbox>

      <q-checkbox v-model="taskForm.completed" label="completed"></q-checkbox>
    </div>
    <q-btn
      push
      color="primary"
      label="Create"
      @click.prevent="createTask"
    ></q-btn>
    <q-separator spaced></q-separator>
    <TaskItem :task="tasks.getAllTasks[0]" />
    <Fragment v-if="tasks?.getAllTasks">
      <q-item
        class="bg-cyan"
        tag="label"
        v-ripple
        v-for="task in tasks.getAllTasks"
        :key="task.id"
      >
        <q-item-section side top> </q-item-section>

        <q-item-section>
          <q-item-label> {{ task?.title }}</q-item-label>
          <q-item-label caption>
            <q-checkbox v-model="task.completed"></q-checkbox>
            <q-checkbox v-model="task.important"></q-checkbox>
            <q-btn class="glossy" round color="red" icon="delete"></q-btn>
          </q-item-label>
          {{ task.completed }}
        </q-item-section>
      </q-item>
    </Fragment>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
import { useQuasar } from "quasar";
import TaskItem from "../../components/TaskItem";

interface TaskModel {
  title: string | number;
  important: boolean;
  completed: boolean;
}

export default defineComponent({
  setup() {
    const $q = useQuasar();
    let taskForm = ref<TaskModel>({
      title: "",
      important: false,
      completed: false,
    });

    const { result: tasks, refetch } = useQuery(
      //В квери переменные передаются в соотв. с доками:
      // В названии квери определяем переменную и её тип,
      // т.к. мы вызываем резолвер и переменная у нас передается аргументом, кидаем её туда
      // Если непонятно, всегда можно скопировать запрос из клиента аполло
      gql`
        query GetAllTasks {
          getAllTasks {
            title
            id
            important
            completed
          }
        }
      `
    );

    const { mutate: createTask, onDone } = useMutation(
      //в gql описываем поля, которые нужно вернуть
      gql`
        mutation CreateTodos(
          $title: String!
          $important: Boolean
          $completed: Boolean
        ) {
          createTask(
            title: $title
            important: $important
            completed: $completed
          ) {
            id
            title
          }
        }
      `,
      //здесь то, что передаем в резолвер в данном случае
      () => ({
        variables: {
          ...taskForm.value,
        },
      })
    );
    onDone(() => {
      taskForm.value = { title: "", important: false, completed: false };
      $q.notify("Task was successfuly created");
      refetch();
    });

    return { tasks, createTask, taskForm };
  },
});
</script>

<style scoped></style>
