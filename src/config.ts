export const config = {
    aws: {
        cognito: {
            shouldUse: process.env.REACT_APP_AWS_USE_COGNTIO_CREDS === "true",
            identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID || "",
        },
        credentials: {
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || "",
        },
        region: process.env.REACT_APP_AWS_REGION || "us-east-1",
        dynamoDb: {
            endpoint: process.env.REACT_APP_AWS_DYNAMODB_ENDPOINT,
        }
    }
};

// @ts-ignore
window.config = config;
