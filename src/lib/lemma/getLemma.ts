import { DynamoDBClient, GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { inflate } from "pako";
import { DATA_TABLE_NAME } from "../constant";
import { getLemmaPk } from "./getLemmaPk";
import { Language, Lemma, LemmaArticle, LemmaArticleRecord } from "./types";


export interface GetLemmaInput {
    dynamoDB: DynamoDBClient,
    lemma: Lemma,
    language: Language,
}

enum LemmaFieldName {
    Article = 'a',
}

export async function getLemma({
    dynamoDB,
    language,
    lemma,
}: GetLemmaInput): Promise<LemmaArticle | null> {
    const command = new GetItemCommand({
        TableName: DATA_TABLE_NAME,
        Key: {
            "pk": { S: getLemmaPk(lemma, language) },
            "sk": { S: LemmaFieldName.Article },
        },
    });

    const response = await dynamoDB.send(command);
    const lemmaRecord = response.Item as LemmaArticleRecord | undefined;

    if (lemmaRecord === undefined) {
        return null;
    }

    const data = new TextDecoder().decode( inflate(lemmaRecord.data.B));

    return JSON.parse(data);
}
