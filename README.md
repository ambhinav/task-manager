# task-manager

## Instructions to Run the App

### Hosted app
The website is hosted on Heroku [here](https://task-manager-728.herokuapp.com/).

CRUD functionalities are supported. Create a task by pressing the "add task" button. Update tasks' statuses ("new", "in progress" and "done"), deadlines, names etc by pressing the pencil icon. Delete by pressing the garbage icon.

### Running locally
1. `cd frontend`
2. `yarn install`
3. `yarn serve`

## Stack
The app has a serverless-architecture with a RESTful API - AWS API Gateway.

The web server and backend/database are seperate applications.
### Frontend
- Vue, Vuex
- Typescript.

### Backend
- NodeJS
- AWS Lambda Functions

### Database
- DynamoDB

## Noteworthy features
- Typescript
- Vuex
- Application hosted on Heroku
- Validation for create and updates to tasks
