<template>
    <v-sheet rounded color="grey">
        <v-container>
            <v-row>
                <v-col cols="8">
                    <div class="text-h4">{{ getStatus() }}</div>
                </v-col>
                <v-spacer></v-spacer>
                <v-col sm="2" cols="4">
                    <div class="numberCircle">{{ getTargetTasks().length }}</div>
                </v-col>
            </v-row>
            <v-row v-for="task in getTargetTasks()" :key="task.id">
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
import { mapGetters } from 'vuex';
const statuses = data.statuses;
const enums = data.statusEnums;
export default {
  components: { TaskCard },
  props: {
      status
  },
  computed: {
    ...mapGetters(['getTasks'])
  },
  methods: {
      getStatus() {
          return statuses[this.status];
      },
      getTargetTasks() {
        let result = []
        switch (this.status) {
          case enums.NEW:
            result = this.getTasks.filter(task => task.status == enums.NEW)
            break;

          case enums.DOING:
            result = this.getTasks.filter(task => task.status == enums.DOING);
            break;
        
          case enums.DONE:
            result = this.getTasks.filter(task => task.status == enums.DONE);
            break;

          default:
            break;
        }
        return result;
      },
  },
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