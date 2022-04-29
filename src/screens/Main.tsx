import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { ReactElement, useEffect } from "react";
import { getLemma } from "../lib/lemma/getLemma";
import { useGetLemma } from "../lib/lemma/useGetLemma";
import { Search } from "./Search";

export function Main(): ReactElement {
    return (
        <main>
            <Search/>
        </main>
    );
}