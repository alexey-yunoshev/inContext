import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { useEffect, useState } from "react";
import { Credentials } from "@aws-sdk/types";
import { config } from "../config";


export function useGetAWSCredentials(): Credentials | null {
    const [credentials, setCredentials] = useState<Credentials | null>(null);


    useEffect(() => {
        if (config.aws.cognito.shouldUse) {
            const credentialProvider = fromCognitoIdentityPool({
                clientConfig: {
                    region: config.aws.region,
                },
                identityPoolId: config.aws.cognito.identityPoolId,
            });

            credentialProvider().then(setCredentials);
        } else {
            setCredentials(config.aws.credentials);
        }

    }, []);

    return credentials;
}
