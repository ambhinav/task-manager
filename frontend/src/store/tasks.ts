import TaskModel from '../utils/taskModel';
import axios from 'axios';
import * as status from '../utils/taskStatusEnums';
const enums = status.statusEnums;
const API = 'https://b88jqn0rp8.execute-api.us-west-1.amazonaws.com/Prod/';

const state = {
    tasks: Array<TaskModel>()
}

const getters = {
   getTasks: (state: any) => state.tasks
}

const mutations = {
    addTask(state: any, taskModel: TaskModel) {
        state.tasks.push(taskModel);
    },
    setTasks(state: any, task: TaskModel) {
        state.tasks.push(task)
    }
}

/** CRUD for tasks */
const actions = {
    async getAllTasks(context: any) {
        try {
            const res = await axios.get(API)
            res.data.forEach((task: any) => {
                let taskM = new TaskModel();
                taskM = { ...task };
                context.commit('setTasks', taskM);
            })
        } catch (err) {
            console.log(err);
        }
    },
    async createTask(context: any, taskModel: TaskModel) {
        try {
            const data = {
                status: taskModel.status,
                deadline: taskModel.deadline,
                name: taskModel.name,
                description: taskModel.description,
                id: taskModel.id
            };
            const res = await axios.put(API, data)
            context.commit('addTask', taskModel);
            return res;
        } catch (err) {
            console.log(err);
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}