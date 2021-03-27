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
		onClose() {
			this.$refs.form.resetValidation();
			this.$emit('closed');
		},
		submit() {
			if (this.$refs.form.validate()) {
				this.loading = true;
				var newTask = {
					deadline: this.deadline,
					name: this.name,
					description: this.description,
					status: "new"
				}
				console.log(newTask);
				this.loading = false;
			}

		}
	}
}
</script>

<style>

</style>