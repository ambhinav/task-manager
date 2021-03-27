<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <div class="text-h3">Task Manager</div>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row class="pt-10">
          <v-col cols="4">
            <div class="text-h4">Hi! Welcome to Task Manager.</div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4">
            <v-btn @click="createTaskDialog = true" color="success">Add Task</v-btn>
          </v-col>
        </v-row>
        <v-row class='pt-10'>
          <v-col md="4" cols="12" v-for="status in getTaskTypes()" :key="status">
            <task-list-container :status="status" />
          </v-col>
        </v-row>
        <v-dialog v-model="createTaskDialog" max-width="400px">
          <task-create-card @closed="createTaskDialog = false" />
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import TaskCreateCard from './components/TaskCreateCard.vue';
import TaskListContainer from './components/TaskListContainer.vue';
import * as data from './utils/taskStatusEnums'
const statuses = data.statuses;

export default {
  name: 'App',
  components: {
    TaskListContainer,
    TaskCreateCard
  },
  created() {
    this.getAllTasks();
  },
  methods : {
    ...mapActions(['getAllTasks']),
    getTaskTypes() {
      return Object.keys(statuses);
    },
  },
  data() {
    return {
      createTaskDialog: false
    }
  }
};
</script>
