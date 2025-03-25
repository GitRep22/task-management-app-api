const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'tasks';


exports.getAllTasks = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const data = await dynamoDb.scan(params).promise();
  return data.Items;
};


exports.getTaskById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  const data = await dynamoDb.get(params).promise();
  return data.Item;
};


exports.createTask = async (task) => {
  const params = {
    TableName: TABLE_NAME,
    Item: task,
  };
  await dynamoDb.put(params).promise();
  return task;
};


exports.updateTask = async (id, updatedTask) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set #title = :title, #status = :status',
    ExpressionAttributeNames: {
      '#title': 'title',
      '#status': 'status',
    },
    ExpressionAttributeValues: {
      ':title': updatedTask.title,
      ':status': updatedTask.status,
    },
    ReturnValues: 'UPDATED_NEW',
  };
  const data = await dynamoDb.update(params).promise();
  return data.Attributes;
};


exports.deleteTask = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  await dynamoDb.delete(params).promise();
  return { id };
};
