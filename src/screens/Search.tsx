import { useState } from "react";
import { Lemma } from "../lib/lemma/types";
import { useGetLemma } from "../lib/lemma/useGetLemma";

export function Search() {
    const [lemma, setLemma] = useState<Lemma>("");
    const [searchInput, setSearchInput] = useState<string>("");


    const lemmaArticle = useGetLemma({
        language: "pl",
        lemma,
    });

    return (
        <div>
            <header>
                <div>
                    <select name="languages" id="languages">
                        <option value="pl">Polish</option>
                    </select>
                </div>
                <div>
                    <input type="search" onChange={({ target: {value} }) => setSearchInput(value)}/>
                </div>
                <button onClick={() => setLemma(searchInput)} >Search</button>
            </header>
            <section>
                {
                    lemmaArticle?.sentences.map((sentence, i) => (
                        <div key={`${lemma}${i}`} style={{marginBottom: "10px"}}>
                            <div >
                                {sentence.text}
                            </div>
                            <a target="_blank" href={`https://translate.google.com/?sl=pl&tl=en&text=${encodeURIComponent(sentence.text)}&op=translate`}>Translate</a>
                        </div>
                    ))
                }
            </section>
        </div>
    )
}