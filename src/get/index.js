const AWS = require('aws-sdk'),
    dynamoDb = new AWS.DynamoDB.DocumentClient(),
    processResponse = require('./process-response'),
    TABLE_NAME = process.env.TABLE_NAME,
    PRIMARY_KEY = process.env.PRIMARY_KEY;

exports.handler = async event => {
    if (event.httpMethod === 'OPTIONS') {
		return processResponse();
    }
    const requestedItemId = event.pathParameters.id;
    if (!requestedItemId) {
        return processResponse(`Error: You missing the id parameter`, 400);
    }

    const key = {};
    key[PRIMARY_KEY] = requestedItemId;
    const params = {
        TableName: TABLE_NAME,
        Key: key
    }
    try {
      const response = await dynamoDb.get(params).promise();
      return processResponse(response.Item);
    } catch (dbError) {
      let errorResponse = `Error: Execution update, caused a Dynamodb error, please look at your logs.`;
      if (dbError.code === 'ValidationException') {
        if (dbError.message.includes('reserved keyword')) errorResponse = `Error: You're using AWS reserved keywords as attributes`;
      }
      console.log(dbError);
      return processResponse(errorResponse, 500);
    }
};