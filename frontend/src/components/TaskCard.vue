<template>
  <div>
    <v-card
      class="mx-auto"
      min-width="200"
      max-width="500"
    >
      <v-card-text>
        <p class="display-1 text--primary">
          {{ name }}
        </p>
        <p>Due: {{ deadline.substr(0, 10) }}</p>
        <div class="text--primary">
          {{ description }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          icon
          @click="editTaskDialog = true"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="red"
          @click="true"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog max-width="400" v-model="editTaskDialog">
      <task-update-card @closed="editTaskDialog = false" :og_name="name" :og_deadline="deadline" :og_description="description" :og_status="status" :id="id" />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TaskUpdateCard from './TaskUpdateCard.vue';


export default Vue.extend({
  components: { TaskUpdateCard },
  name: 'TaskCard',
  props: {
    name: String,
    description: String,
    deadline: String,
    status: String,
    id: Number,
  },
  data() {
    return {
      editTaskDialog: false
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
