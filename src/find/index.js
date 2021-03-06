const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const processResponse = require('./process-response');
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return processResponse();
  }
  let params = {
    TableName: TABLE_NAME
  }
  try {
    const response = await dynamoDb.scan(params).promise();
    return processResponse(response.Items);
  } catch (dbError) {
    let errorResponse = `Error: Execution update, caused a Dynamodb error, please look at your logs.`;
    if (dbError.code === 'ValidationException') {
      if (dbError.message.includes('reserved keyword')) errorResponse = `Error: You're using AWS reserved keywords as attributes`;
    }
    console.log(dbError);
    return processResponse(errorResponse, 500);
  }
};