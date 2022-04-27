<template>
  <div
    class="main-wrapper q-stepper q-stepper--bordered q-stepper__flat no-shadow q-mx-auto q-mt-lg q-px-md q-py-md"
  >
    <q-form @submit="createTask" class="q-gutter-md q-px-sm">
      <div class="row items-center justify-between">
        <q-input
          class="col-12"
          v-model="taskForm.title"
          label="text To Do"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Пожалуйста, заполните поле',
          ]"
        >
          <template v-slot:append>
            <q-btn
              round
              size="md"
              color="primary"
              class="submit"
              type="submit"
              icon="add"
            ></q-btn>
          </template>
        </q-input>
        <!--        <q-checkbox v-model="taskForm.completed" label="completed"></q-checkbox>-->

        <!-- <input v-model="taskTitle" type="text" /> -->

        <!--        <q-checkbox-->
        <!--          class="col-2 q-mb-lg column"-->
        <!--          size="lg"-->
        <!--          color="teal"-->
        <!--          v-model="taskForm.important"-->
        <!--          label="Important"-->
        <!--        ></q-checkbox>-->

        <!--        <q-checkbox v-model="taskForm.completed" label="completed"></q-checkbox>-->
      </div>
    </q-form>
    <q-separator spaced></q-separator>
    <q-btn-group class="q-mx-auto q-my-md" push>
      <q-btn push label="All" icon="timeline" @click="setFilter({})" />
      <q-btn
        push
        label="Important"
        icon="visibility"
        @click="setFilter({ important: true })"
      />
      <q-btn
        push
        label="Completed"
        icon="update"
        @click="setFilter({ completed: true })"
      />
      <q-btn
        push
        label="Incomplete"
        icon="update"
        @click="setFilter({ completed: false })"
      />
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
    const filterObj = ref({});
    let taskForm = ref<TaskModel>({
      title: "",
      important: false,
      completed: false,
    });

    function update(obj: any) {
      console.log(obj);
      updateTask({ ...obj });
    }
    function setFilter(obj: any) {
      filterObj.value = obj;
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
        query GetAllTasks($filter: Filters) {
          getAllTasks(filter: $filter) {
            title
            id
            important
            completed
          }
        }
      `,
      () => ({
        filter: { where: { ...filterObj.value } },
      }),
      { fetchPolicy: "no-cache" }
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
      filterObj,
      setFilter,
    };
  },
});
</script>

<style scoped>
.main-wrapper {
  max-width: 700px;
}
</style>
