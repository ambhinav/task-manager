<template>
    <v-sheet rounded color="grey">
        <v-container>
            <v-row>
                <v-col cols="8">
                    <div class="text-h4">{{ getStatus() }}</div>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="2">
                    <div class="numberCircle">{{ getTasks().length }}</div>
                </v-col>
            </v-row>
            <v-row v-for="task in getTasks()" :key="task.id">
                <v-col cols="12">
                  <task-card :name="task.name" :description="task.description" :deadline="task.deadline" :status="task.status" :id="task.id" />
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>
import TaskCard from './TaskCard.vue'
import * as data from '../utils/taskStatusEnums'
const statuses = data.statuses;
export default {
  components: { TaskCard },
  props: {
      status: String
  },
  methods: {
      getStatus() {
          return statuses[this.status];
      },
      getTasks() {
          return this.fakeTasks;
      },
  },
  data: () => ({
    fakeTasks: [
      {
        id: 1,
        name: "task1",
        description: "do something 1",
        deadline: new Date().toISOString(),
        status: "new"
      },
      {
        id: 2,
        name: "task2",
        description: "do something 2",
        deadline: new Date().toISOString(),
        status: "new"
      },
      {
        id: 3,
        name: "task3",
        description: "do something 3",
        deadline: new Date().toISOString(),
        status: "done"
      },
      {
        id: 4,
        name: "task4",
        description: "do something 4",
        deadline: new Date().toISOString(),
        status: "done"
      },
      {
        id: 5,
        name: "task5",
        description: "do something 5",
        deadline: new Date().toISOString(),
        status: "new"
      },
      {
        id: 6,
        name: "task6",
        description: "do something 6",
        deadline: new Date().toISOString(),
        status: "doing"
      },
    ],
  }),
}
</script>

<style>
.numberCircle {
    border-radius: 50%;
    width: 56px;
    height: 56px;
    padding: 8px;

    background: #fff;
    border: 2px solid #666;
    color: #666;
    text-align: center;

    font: 32px Arial, sans-serif;
}
</style>