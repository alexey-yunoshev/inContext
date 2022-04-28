import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { useEffect, useState } from "react";
import { config } from "../config";
import { useGetAWSCredentials } from "./useGetAWSCredentials";

export function useGetDynamoDBClient(): DynamoDBClient | null {
    const [client, setClient] = useState<DynamoDBClient | null>(null);
    const credentials = useGetAWSCredentials();

    useEffect(() => {
        if (credentials === null) {
            return;
        }

        const clientConfig: DynamoDBClientConfig = {
            region: config.aws.region,
            credentials,
        };

        if (config.aws.dynamoDb.endpoint !== undefined) {
            clientConfig.endpoint = config.aws.dynamoDb.endpoint;
        }
        
        setClient(new DynamoDBClient(clientConfig));
    }, [credentials]);

    return client;
}
