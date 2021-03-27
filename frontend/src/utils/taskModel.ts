export default class TaskModel {
    name: string;
    description: string;
    deadline: string;
    status: string;
    id: number;
  
    constructor() {
      this.name = '';
      this.description = '';
      this.deadline = '';
      this.status = '';
      this.id = 0
    }
  }