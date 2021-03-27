<template>
	<v-card>
		<v-card-title>
			<span class="headline">Create your task!</span>
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
						sm="12"
						md="12"
					>
						<v-date-picker
							:rules="[v => !!v || 'Please enter a deadline for the task']"
							v-model="deadline"
							:min="(new Date()).toISOString()"
						></v-date-picker>
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
				Create
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapActions } from 'vuex';
import TaskModel from '../utils/taskModel';
import * as data from '../utils/taskStatusEnums'
const enums = data.statusEnums;
export default {
	name: "TaskCreateCard",
	data() {
		return {
			deadline: new Date().toISOString().substr(0, 10),
			name: '',
			description: '',
			loading: false
		}
	},
	methods: {
		...mapActions(['createTask']),
		onClose() {
			this.$refs.form.resetValidation();
			this.$emit('closed');
		},
		submit() {
			if (this.$refs.form.validate()) {
				this.loading = true;
				const callCreateTask = async () => {
					var task = new TaskModel();
					try {
						/*
						var task = {
							name: this.name,
							description: this.description,
							deadline: this.deadline,
							status: enums.NEW,
							id: new Date().getTime()
						}
						*/
						task.name = this.name;
						task.description = this.description;
						task.deadline = this.deadline;
						task.status = enums.NEW;
						task.id = new Date().getTime();
						await this.createTask(task);
					} catch (err) {
						console.log(err);
						console.log(err.body)
					} finally {
						this.loading = false;
					}
				};
				callCreateTask();
			}
		}
	}
}
</script>

<style>

</style>