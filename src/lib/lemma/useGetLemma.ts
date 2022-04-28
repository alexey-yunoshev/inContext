import { useEffect, useState } from "react";
import { useGetDynamoDBClient } from "../useGetDynamoDBClient";
import { getLemma } from "./getLemma";
import { LemmaArticle } from "./types";

export interface UseGetLemmaInput {
    lemma: Lemma,
    language: Language,
}

export function useGetLemma(input: UseGetLemmaInput): LemmaArticle | null {
    const dynamoDB = useGetDynamoDBClient();
    const [lemmaArticle, setLemmaArticle] = useState<LemmaArticle | null>(null); 

    useEffect(() => {
        if (dynamoDB && input.lemma !== "") {
            getLemma({dynamoDB, ...input}).then(setLemmaArticle);
        }
    }, [dynamoDB, input.lemma]);

    return lemmaArticle;
}
