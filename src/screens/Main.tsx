import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { ReactElement, useEffect } from "react";
import { getLemma } from "../lib/lemma/getLemma";
import { useGetLemma } from "../lib/lemma/useGetLemma";
import { Search } from "./Search";

export function Main(): ReactElement {
    const lemmaArticle = useGetLemma({
        language: "pl",
        lemma: "blog",
    });
    
    console.log(`lemmaArticle`, lemmaArticle)

    // useEffect(() => {
    //     const credentialProvider = fromCognitoIdentityPool({
    //         clientConfig: {
    //             region: "eu-central-1",
    //         },
    //         identityPoolId: "eu-central-1:3024defa-7012-41da-ba4f-5574f4eabef0"
    //     });

    //     credentialProvider().then((credentials) => {
    //         const dynamodb = new DynamoDBClient({
    //             region: "eu-central-1",
    //             // credentials,

    //             endpoint: "http://localhost:8000",
    //             credentials: {
    //                 accessKeyId: "accessKeyId",
    //                 secretAccessKey: "secretAccessKey",
    //             }
    //         });
    //         getLemma({
    //             dynamoDB: dynamodb,
    //             language: "pl",
    //             lemma: "blog",
    //         })
    //         .then(console.log)
    //         .catch(console.error)
    //     }).catch(console.error);

    // }, [])

    return (
        <main>
            <Search/>
        </main>
    );
}