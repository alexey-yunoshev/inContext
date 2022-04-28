export type Lemma = string;
export type Language = string;

export interface Sentence {
    text: string;
    source: string;
    lemmas: Array<Lemma>;
}

export interface LemmaArticle {
   lemma: Lemma;
   sentences: Array<Sentence>;
}

export interface LemmaRecordData {
    sentences: Array<Sentence>;
 }

export interface LemmaArticleRecord {
    /**
     * @example
     *   l#pl#blog
     * 
     * "l" stands for "lemma"
     * "pl" stands for "Polish"
     * "blog" is the actual lemma
     */
    pk: { S: string };
    // LemmaRecordData
    sk: { S: string };
    data: { B: Uint8Array };
 }
