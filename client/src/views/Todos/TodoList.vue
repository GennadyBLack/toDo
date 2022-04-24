<template>
  <div class="main-wrapper">
    <input v-model="taskTitle" type="text" />
    <input v-model="important" type="checkbox" />
    <button @click.prevent="createTask">Создать</button>
    <ul v-if="tasks">
      <li v-for="task in tasks.getTasksByUser" :key="task.id" class="">
        {{ task.title }}
      </li>
    </ul>
    <h5 v-else>Тасков нет</h5>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const taskTitle = ref<string>("");
    const important = ref<boolean>(false);
    const userId = ref<number>(+route?.params?.id);
    const tasks = ref(getTasks());

    function getTasks() {
      const { result } = useQuery(
        //В квери переменные передаются в соотв. с доками:
        // В названии квери определяем переменную и её тип,
        // т.к. мы вызываем резолвер и переменная у нас передается аргументом, кидаем её туда
        // Если непонятно, всегда можно скопировать запрос из клиента аполло
        gql`
          query GetTodos($userId: Int!) {
            getTasksByUser(userId: $userId) {
              id
              title
            }
          }
        `,
        { userId: userId }
      );
      return result;
    }

    const { mutate: createTask, onDone } = useMutation(
      //в gql описываем поля, которые нужно вернуть
      gql`
        mutation CreateTodos(
          $userId: Int!
          $title: String!
          $important: Boolean
          $completed: Boolean
        ) {
          createTask(
            userId: $userId
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
          userId: userId.value,
          title: taskTitle.value,
          important: important.value,
          completed: false,
        },
      })
    );
    onDone(() => {
      getTasks();
    });

    return { tasks, taskTitle, route, important, createTask };
  },
});
</script>

<style scoped></style>
