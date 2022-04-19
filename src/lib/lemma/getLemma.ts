import { DynamoDBClient, GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { DATA_TABLE_NAME } from "../../constants";
import { SentenceRecord } from "./records";
import { Language, Lemma } from "./types";
import { convertSentenceRecordToSentence, getSentencePk } from "./utils";


export interface SearchLemmaUsageExamplesInput {
    dynamodb: DynamoDBClient,
    lemma: Lemma,
    language: Language,
}

enum LemmaFieldName {
    Article = 'a',
}

export async function getLemma({
    dynamodb,
    language,
    lemma,
}: SearchLemmaUsageExamplesInput): Promise<Array<Sentence>> {
    const command = new GetItemCommand({
        TableName: DATA_TABLE_NAME,
        Key: {
            "pk": { S: getSentencePk(lemma, language) },
            "sk": { S: LemmaFieldName.Article },
        },
    });

    const response = await dynamodb.send(command);
    const lemmaRecord = response.Item;

    return items;
}
