<template>
  <div
    class="main-wrapper q-stepper q-stepper--bordered q-stepper__flat no-shadow q-mx-auto q-mt-lg q-px-md q-py-md"
  >
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
    <q-btn-group class="q-mx-auto q-my-md" push>
      <q-btn push label="All" icon="timeline" />
      <q-btn push label="Important" icon="visibility" />
      <q-btn push label="Completed" icon="update" />
    </q-btn-group>
    <div v-if="allTasks">
      <TaskItem
        v-for="task in allTasks"
        :key="task.id"
        :task="task"
        @update="update"
        @refetch="refetch"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
import { useQuasar } from "quasar";
import TaskItem from "../../components/TaskItem.vue";

interface TaskModel {
  title: string | number;
  important: boolean;
  completed: boolean;
}

export default defineComponent({
  components: { TaskItem },
  setup() {
    const $q = useQuasar();
    let taskForm = ref<TaskModel>({
      title: "",
      important: false,
      completed: false,
    });

    function update(obj: any) {
      console.log(obj);
      updateTask({ ...obj });
    }
    const { mutate: updateTask, onDone: onUpdated } = useMutation(
      //в gql описываем поля, которые нужно вернуть
      gql`
        mutation updateTask(
          $id: Int!
          $title: String
          $important: Boolean
          $completed: Boolean
        ) {
          updateTask(
            id: $id
            title: $title
            important: $important
            completed: $completed
          ) {
            id
            title
          }
        }
      `
    );
    onUpdated(() => {
      $q.notify("Task was successfuly updated");
      refetch();
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
    const allTasks = computed(() => tasks?.value?.getAllTasks);

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

    return {
      tasks,
      createTask,
      taskForm,
      allTasks,
      update,
      updateTask,
      refetch,
    };
  },
});
</script>

<style scoped>
.main-wrapper {
  max-width: 700px;
}
</style>
