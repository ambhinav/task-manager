'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const id = JSON.parse(event.body);

  const params = {
    TableName: "tasks",
    Key: {
      id
    }
  };

  try {
    const data = await documentClient.delete(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch(err) {
    responseBody = `Unable to delete task: ${err} ${id}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};