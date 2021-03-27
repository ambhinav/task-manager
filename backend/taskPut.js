'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const { id, name, deadline, description, status } = JSON.parse(event.body);
  
  const params = {
    TableName: "tasks",
    Item: {
      id: id,
      name: name,
      deadline: deadline,
      description: description,
      status: status
    }
  };

  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch(err) {
    responseBody = `Unable to put task: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    'headers': { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
      },

    body: responseBody
  };

  return response;
};
