import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { ReactElement, useEffect } from "react";

export function Main(): ReactElement {
    useEffect(() => {
        const credentialProvider = fromCognitoIdentityPool({
            clientConfig: {
                region: "eu-central-1",
            },
            identityPoolId: "eu-central-1:3024defa-7012-41da-ba4f-5574f4eabef0"
        });

        credentialProvider().then((credentials) => {
            const client = new DynamoDBClient({
                region: "eu-central-1",
                // endpoint: "http://localhost:8000",
                credentials,
            });
            const command = new QueryCommand({
                TableName: "temp",
                ReturnConsumedCapacity: 'TOTAL',
                KeyConditionExpression: "pk = :pk",
                ExpressionAttributeValues: {
                    ":pk": { S: "pk_1" }
                }
            });
        
            client.send(command).then(console.log).catch((error) => {
                debugger;
                console.error(error);
            });
        }).catch(console.error);

    }, [])

    return <h1>Hello world!!!</h1>;
}