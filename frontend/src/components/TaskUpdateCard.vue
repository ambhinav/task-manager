<template>
	<v-card>
		<v-card-title>
			<span class="headline">Update your task!</span>
		</v-card-title>
		<v-card-text>
			<v-form ref="form">
			<v-container>
				<v-row>
					<v-col
						cols="12"
						sm="8"
						md="8"
					>
						<v-text-field
							label="Name"
							:rules="[v => !!v || 'Please enter the name of the task']"
							v-model="name"
							required
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col
						cols="12"
						sm="12"
						md="12"
					>
						<v-text-field
							label="Description"
							required
							:rules="[v => !!v || 'Please enter a description for the task']"
							v-model="description"
							hint="What do you want to accomplish?"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col
						cols="12"
						sm="6"
					>
						<v-autocomplete
							:items="getStatuses()"
							v-model="status"
							:rules="[v => !!v || 'Please enter the task status']"
							label="Status"
						></v-autocomplete>
					</v-col>
				</v-row>
				<v-row>
					<v-col
						cols="12"
						sm="12"
						md="12"
					>
						<v-date-picker :rules="[v => !!v || 'Please enter a deadline for the task']" v-model="deadline"></v-date-picker>
					</v-col>
				</v-row>
			</v-container>
			</v-form>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
				color="blue darken-1"
				text
				@click="onClose()"
			>
				Close
			</v-btn>
			<v-btn
				color="blue darken-1"
				text
				@click="submit()"
				:loading="loading"
			>
				Update
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapActions } from 'vuex';
import TaskModel from '../utils/taskModel';
import * as data from '../utils/taskStatusEnums'
const statuses = data.statuses;
const statusesReverse = data.statusesReverse;
export default {
	name: "TaskCreateCard",
	props: {
		og_name: String,
		og_description: String,
		og_deadline: String,
		og_status: String,
		id: Number
	},
	data() {
		return {
			deadline: this.og_deadline.substr(0, 10), 
			name: this.og_name,
			description: this.og_description,
			status: statuses[this.og_status],
			loading: false,
		}
	},
	methods: {
		...mapActions(['updateTask']),
		getStatuses() {
			return Object.keys(statusesReverse);
		},
		onClose() {
			this.$refs.form.resetValidation();
			this.$emit('closed');
		},
		submit() {
			if (this.$refs.form.validate()) {
				this.loading = true;
				const callUpdateTask = async () => {
					var task = new TaskModel();
					try {
						task.name = this.name;
						task.description = this.description;
						task.deadline = this.deadline;
						task.status = statusesReverse[this.status];
						task.id = this.id;
						await this.updateTask(task);
						this.$toast.success("Task updated!");
						this.$emit('closed');
					} catch (err) {
						this.$toast.error(err);
					} finally {
						this.loading = false;
					}
				};
				callUpdateTask();		
			}
		}
	}
}
</script>

<style>

</style>