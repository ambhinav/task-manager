'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const { id, name, deadline, description, status } = JSON.parse(event.body);

  const params = {
    TableName: "tasks",
    Key: {
      id
    },
    UpdateExpression: "set #nm = :n, deadline = :dead, description = :desc, #st = :s",
    ExpressionAttributeValues:{
        ":n": name,
        ":dead": deadline,
        ":desc": description,
        ":s": status
    },
    // name is a reserved keyword in Dynamo DB
    ExpressionAttributeNames:{
      "#nm": "name",
      "#st": "status"
    },
    ReturnValues:"UPDATED_NEW"
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch(err) {
    responseBody = `Unable to update task: ${err}`;
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
