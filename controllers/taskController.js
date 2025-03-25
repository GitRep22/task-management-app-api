const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE || "tasks_table-dev";

module.exports.getTasks = async (req, res) => {
  try {
    const params = { TableName: TABLE_NAME };
    const data = await dynamoDb.scan(params).promise();
    res.status(200).json(data.Items);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

module.exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.status(400).json({ error: "Invalid task ID. It should be a number." });
  }

  try {
    const params = {
      TableName: TABLE_NAME,
      Key: { id: numericId },
    };

    const data = await dynamoDb.get(params).promise();
    if (!data.Item) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(data.Item);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

module.exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !status) {
    return res.status(400).json({ error: "Title and status are required." });
  }

  try {
 
    const scanParams = {
      TableName: TABLE_NAME,
      ProjectionExpression: "id"
    };

    const scanResult = await dynamoDb.scan(scanParams).promise();
    const highestId = scanResult.Items.length > 0
      ? Math.max(...scanResult.Items.map(item => item.id))
      : 0;

    const newId = highestId + 1;

    const params = {
      TableName: TABLE_NAME,
      Item: {
        id: newId,
        title,
        description,
        status
      }
    };

    await dynamoDb.put(params).promise();
    res.status(201).json({ message: "Task created successfully", taskId: newId });

  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

module.exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.status(400).json({ error: "Invalid task ID. It should be a number." });
  }

  try {
    const params = {
      TableName: TABLE_NAME,
      Key: { id: numericId },
      UpdateExpression: "SET #title = :title, #description = :description, #status = :status",
      ExpressionAttributeNames: {
        "#title": "title",
        "#description": "description",
        "#status": "status"
      },
      ExpressionAttributeValues: {
        ":title": title,
        ":description": description,
        ":status": status
      },
      ConditionExpression: "attribute_exists(id)",
      ReturnValues: "ALL_NEW",
    };

    const result = await dynamoDb.update(params).promise();
    res.status(200).json(result.Attributes);
  } catch (error) {
    if (error.code === "ConditionalCheckFailedException") {
      return res.status(404).json({ error: "Task not found" });
    }
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};



module.exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.status(400).json({ error: "Invalid task ID. It should be a number." });
  }

  try {
    
    const getParams = {
      TableName: TABLE_NAME,
      Key: { id: numericId }
    };

    const existingTask = await dynamoDb.get(getParams).promise();

    if (!existingTask.Item) {
      return res.status(404).json({ error: "Task not found" });
    }

    
    const deleteParams = {
      TableName: TABLE_NAME,
      Key: { id: numericId }
    };

    await dynamoDb.delete(deleteParams).promise();
    res.status(200).json({ message: "Task deleted successfully" });

  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

