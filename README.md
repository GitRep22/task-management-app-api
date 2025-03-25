Task management app created for a coding challenge.

Project Structure

/task-management-app
  ├── backend (Node.js/Express API)
  ├── frontend (React UI - task-management-ui)

Backend
Running Locally
Navigate to the backend folder:
cd task-management-app/backend

Install dependencies:
npm install


Start the local server:
npm run dev

Deploying to AWS Lambda & API Gateway (Using Serverless Framework)
Ensure you have the Serverless Framework installed:
npm install -g serverless

Navigate to the backend folder:
cd task-management-app/backend

Deploy the backend:
serverless deploy
The deployment output will provide the API Gateway URL for the endpoints.

In FrontEnd The BASE_URL in taskApi.js under the services folder is directly updated to match the deployed API URL.

Frontend
Running Locally
Navigate to the frontend folder:
cd task-management-app/frontend

Install dependencies:
npm install

Start the local development server:
npm run dev

Deploying to AWS S3 (Using Serverless Framework)
Navigate to the frontend folder:
cd task-management-app/frontend

Install the necessary Serverless plugins:
npm install -g serverless
npm install serverless-finch --save-dev

Build the project for production:
npm run build

Open serverless.yml and configure your unique bucket name in the custom section for S3:
custom:
  client:
    bucketName: <unique-bucket-name>

Deploy the frontend:
serverless client deploy
The output will provide the hosted URL for the frontend.

Assumptions
Node.js (LTS version) is installed.

AWS credentials are configured for deployment.

Serverless Framework is installed globally.

The BASE_URL in taskApi.js under the services folder is directly updated to match the deployed API URL.

Frontend is deployed using a unique bucket name in serverless.yml.

AWS Deployment Steps
Set up AWS credentials locally using:
aws configure

Deploy the backend using Serverless Framework:
serverless deploy

Deploy the frontend to S3 using Serverless Framework:
serverless client deploy

Verify the API endpoints and frontend URL.
Notes
Ensure CORS is configured properly for API Gateway if facing cross-origin issues.

Update taskApi.js directly with the deployed API URL instead of using environment variables.

If changes are made, restart the frontend server after modifying the API URL.