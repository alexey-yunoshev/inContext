import { Lemma, Language } from "./types";

export function getLemmaPk(lemma: Lemma, language: Language) {
    return `l#${language}#${lemma}`;
}
