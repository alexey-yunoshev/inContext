import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Lemma } from "../lib/lemma/types";
import { useGetLemma } from "../lib/lemma/useGetLemma";
import { MicrosoftBingTranslator } from "../logos/BingTranslator";
import { GitHubLogo } from "../logos/GitHub";
import { useMediaQuery } from 'react-responsive'

const GOOGLE_TRANSLATE_CHARACTER_LIMIT = 5_000;
const YANDEX_TRANSLATE_CHARACTER_LIMIT = 10_000;
const MICROSOFT_BING_TRANSLATOR_CHARACTER_LIMIT = 1_000;

enum SearchParam {
    Query = "q",
}

function YandexTranslateIcon() {
    return (
        <svg
            viewBox="0 0 44 44"
            width="25"
            height="25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                cursor: "pointer",
            }}
        >
            <g
                clipPath="url(#a)">
                <path
                    d="M39 39h-9.63L14.63 5H39v34z"
                    fill="#FC3F1D"
                />
                <path
                    d="M39 39h-9.63L14.63 5H39v34z"
                    fill="#2B2B2B" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M33.71 19.33a4.1 4.1 0 0 0-2.2-2.17c.18-.8.24-1.46.26-1.9h-1.8a9.8 9.8 0 0 1-.2 1.41c-1.4-.2-2.98 0-4.5.54-.17-.98-.28-1.9-.34-2.7 5.41-.3 8.6-1.58 8.75-1.65L33 11.24c-.03 0-3.06 1.2-8.13 1.5 0-1.21-.04-1.2.02-1.61l-1.8-.02c-.04.34-.03.7-.02 1.7h-.17c-1.62 0-3.12-.12-3.48-.15l-.33 1.79c.53.04 2.15.13 3.6.13h.22l.23-.01c.07 1 .2 2.16.44 3.42-2.39 1.4-4.3 4.1-3.32 6.3.4.92 1.19 1.52 2.2 1.67.18.02.36.04.54.04 1.03 0 2.21-.41 3.34-1.11a10.8 10.8 0 0 0 1.39 1.7l1.24-1.29c-.02-.01-.54-.5-1.2-1.49a12.86 12.86 0 0 0 3.26-4.91c.4.23.8.57 1.02 1.09.72 1.75-.32 3.78-1.3 4.66l1.23 1.3c1.62-1.47 2.73-4.21 1.74-6.62zM22.73 24.2a.98.98 0 0 1-.83-.62c-.44-1.01.52-2.67 2.1-3.77.4 1.4.9 2.6 1.41 3.56-.96.6-1.95.94-2.68.83zm4.51-2.4-.4.42c-.44-.9-.88-1.98-1.2-3.26a8.31 8.31 0 0 1 3.65-.58 11.12 11.12 0 0 1-2.05 3.43z"
                    fill="#fff" />
                <path
                    d="M5 5h9.63l14.74 34H5V5z"
                    fill="#FC3F1D"
                />
                <path
                    d="M5 5h9.63l14.74 34H5V5z"
                    fill="url(#b)"
                    fillOpacity=".4" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.38 17.42 9.52 30.96h2.4l1.44-3.61h5.93l1.44 3.61h2.4l-5.86-13.54h-1.9zm.94 2.79 2.19 5.31h-4.37l2.18-5.31z"
                    fill="#fff" />
            </g>
            <defs>
                <linearGradient
                    id="b"
                    x1="49.36"
                    y1="1.11"
                    x2="13.14"
                    y2="32.31"
                    gradientUnits="userSpaceOnUse">
                    <stop
                        stopColor="#fff" />
                    <stop
                        offset="1"
                        stopColor="#fff"
                        stopOpacity="0"
                    />
                </linearGradient>
                <clipPath
                    id="a">
                    <circle
                        cx="22"
                        cy="22"
                        r="17" />
                </clipPath>
            </defs>
        </svg>
    );
}

function GoogleTranslateIcon() {
    return (

        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 998.1 998.3" xmlSpace="preserve" height={20} width={20}>
            <path fill="#DBDBDB" d="M931.7 998.3c36.5 0 66.4-29.4 66.4-65.4V265.8c0-36-29.9-65.4-66.4-65.4H283.6l260.1 797.9h388z" />
            <path fill="#DCDCDC" d="M931.7 230.4c9.7 0 18.9 3.8 25.8 10.6 6.8 6.7 10.6 15.5 10.6 24.8v667.1c0 9.3-3.7 18.1-10.6 24.8-6.9 6.8-16.1 10.6-25.8 10.6H565.5L324.9 230.4h606.8m0-30H283.6l260.1 797.9h388c36.5 0 66.4-29.4 66.4-65.4V265.8c0-36-29.9-65.4-66.4-65.4z" />
            <polygon fill="#4352B8" points="482.3,809.8 543.7,998.3 714.4,809.8" />
            <path fill="#607988" d="M936.1 476.1V437H747.6v-63.2h-61.2V437H566.1v39.1h239.4c-12.8 45.1-41.1 87.7-68.7 120.8-48.9-57.9-49.1-76.7-49.1-76.7h-50.8s2.1 28.2 70.7 108.6c-22.3 22.8-39.2 36.3-39.2 36.3l15.6 48.8s23.6-20.3 53.1-51.6c29.6 32.1 67.8 70.7 117.2 116.7l32.1-32.1c-52.9-48-91.7-86.1-120.2-116.7 38.2-45.2 77-102.1 85.2-154.2H936v.1z" />
            <path fill="#4285F4" d="M66.4 0C29.9 0 0 29.9 0 66.5v677c0 36.5 29.9 66.4 66.4 66.4h648.1L454.4 0h-388z" />
            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="534.3" y1="433.2" x2="998.1" y2="433.2">
                <stop offset="0" stopColor="#fff" stopOpacity=".2" />
                <stop offset="1" stopColor="#fff" stopOpacity=".02" />
            </linearGradient>
            <path fill="url(#a)" d="M534.3 200.4h397.4c36.5 0 66.4 29.4 66.4 65.4V666L534.3 200.4z" />
            <path fill="#EEEEEE" d="M371.4 430.6c-2.5 30.3-28.4 75.2-91.1 75.2-54.3 0-98.3-44.9-98.3-100.2s44-100.2 98.3-100.2c30.9 0 51.5 13.4 63.3 24.3l41.2-39.6c-27.1-25-62.4-40.6-104.5-40.6-86.1 0-156 69.9-156 156s69.9 156 156 156c90.2 0 149.8-63.3 149.8-152.6 0-12.8-1.6-22.2-3.7-31.8h-146v53.4l91 .1z" />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg
            fill="var(--text-primary)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="20px"
            height="20px">
            <path
                fill="none"
                stroke="var(--text-primary)"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M13 4A9 9 0 1 0 13 22A9 9 0 1 0 13 4Z" />
            <path
                fill="none"
                stroke="var(--text-primary)"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M26 26L19.437 19.437" />
        </svg>
    )
}

function ToolbarSeparator() {
    return (
        <div
            style={{
                borderLeftColor: "var(--control-bg)",
                borderLeftStyle: "solid",
                borderLeftWidth: "1px",
                height: "35px",
                width: "1px",
            }}
        >
        </div>
    )
}

export function Search() {
    const [lemma, setLemma] = useState<Lemma>("");
    const [language] = useState<Lemma>("pl");
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchParams, setSearchParams] = useSearchParams();
    const isWideScreen = useMediaQuery({
        query: '(min-width: 520px)'
    })

    useEffect(() => {
        const queryParam = searchParams.get(SearchParam.Query);
        if (queryParam === null) {
            return;
        }

        if (queryParam.length > 50) {
            setSearchParams({ [SearchParam.Query]: "" });
            return;
        }

        setSearchInput(queryParam);
        setLemma(queryParam);
    }, [searchParams]);

    const lemmaArticle = useGetLemma({
        language: "pl",
        lemma,
    });

    const sentences = (lemmaArticle?.sentences || [])
        .sort((a, b) => a.text.length - b.text.length);

    const allSentences = sentences
        .map((sentence, i) => `${i + 1}. ${sentence.text}`)
        .join(`%0A%0A`);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    marginLeft: "var(--line-height-2xs)",
                    marginRight: "var(--line-height-2xs)",
                    width: "800px",
                }}
            >
                <div
                    className={classNames('header', { 'bordered-header': sentences.length > 0 })}
                >
                    {
                        isWideScreen
                            ? (
                                <div
                                    style={{
                                        fontSize: "var(--line-height-l)",
                                        fontWeight: "bold",
                                    }}
                                >inContext</div>
                            ) : null
                    }
                    <div
                        style={{
                            alignItems: "center",
                            marginTop: "var(--line-height-2xs)",
                            marginBottom: "var(--line-height-2xs)",
                            display: "flex",
                            height: "var(--size_4xl)",
                            justifyContent: "center",
                            flex: "1",
                        }}
                    >
                        <form
                            style={{
                                alignItems: "center",
                                gap: "var(--spacing_l)",
                                display: "flex",
                                height: "var(--size_4xl)",
                                justifyContent: "center",
                                width: "100%",
                            }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                setSearchParams({ [SearchParam.Query]: searchInput });
                            }}>
                            <div>
                                <select
                                    name="languages"
                                    id="languages"
                                    className="input"
                                    style={{
                                        borderBottomLeftRadius: "var(--border-radius_m)",
                                        borderTopLeftRadius: "var(--border-radius_m)",
                                    }}
                                >
                                    <option value="pl">Polish</option>
                                </select>
                            </div>
                            <div
                                style={{
                                    width: isWideScreen ? "auto" : "100%",
                                }}
                            >
                                <input
                                    style={{
                                        width: isWideScreen ? "auto" : "100%",
                                    }}
                                    className="input"
                                    type="search"
                                    maxLength={25}
                                    value={searchInput}
                                    onChange={({ target: { value } }) => setSearchInput(value)}
                                />
                            </div>
                            <button
                                className="input"
                                style={{
                                    borderBottomRightRadius: "var(--border-radius_m)",
                                    borderTopRightRadius: "var(--border-radius_m)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyItems: "center",
                                }}
                                type="submit"
                            >
                                <SearchIcon />
                            </button>
                        </form>
                    </div>
                    {
                        isWideScreen
                            ? (
                                <a
                                    title="Source code"
                                    target="_blank"
                                    href="https://github.com/alexey-yunoshev/incontext"
                                >
                                    <GitHubLogo />
                                </a>
                            ) : null
                    }
                </div>
                <section>
                    {
                        lemma === ""
                            ? null
                            : (
                                <div
                                    style={{
                                        background: "var(--bg-accent)",
                                        borderBottomColor: "var(--control-bg)",
                                        borderBottomStyle: "solid",
                                        borderBottomWidth: "1px",

                                        display: "flex",
                                        alignItems: "center",
                                        gap: "var(--line-height-2xs)",
                                        paddingBottom: "var(--spacing_l)",
                                        paddingTop: "var(--spacing_l)",
                                        marginBottom: "var(--line-height-2xs)",
                                        position: "sticky",
                                        top: "73px",
                                    }}
                                >
                                    {
                                        sentences.length === 0
                                            ? null
                                            : (
                                                <>
                                                    <div>
                                                        <div
                                                            style={{
                                                                fontSize: "var(--size_xs)",
                                                                marginBottom: "var(--spacing_l)",
                                                            }}
                                                        >Translate</div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "var(--spacing_l)",
                                                            }}
                                                        >
                                                            <a
                                                                title={`Translate all sentences in Yandex Translate. Character limit is ${YANDEX_TRANSLATE_CHARACTER_LIMIT}.`}
                                                                target="_blank"
                                                                href={`https://translate.yandex.com/?lang=${language}-ru&text=${allSentences.slice(0, YANDEX_TRANSLATE_CHARACTER_LIMIT)}`}>
                                                                <YandexTranslateIcon />
                                                            </a>
                                                            <a
                                                                title={`Translate all sentences in Google Translate. Character limit is ${GOOGLE_TRANSLATE_CHARACTER_LIMIT}.`}
                                                                target="_blank"
                                                                href={`https://translate.google.com/?sl=${language}&tl=ru&text=${allSentences.slice(0, GOOGLE_TRANSLATE_CHARACTER_LIMIT)}&op=translate`}>
                                                                <GoogleTranslateIcon />
                                                            </a>
                                                            <a
                                                                title={`Translate all sentences in Microsoft Bing Translator. Character limit is ${MICROSOFT_BING_TRANSLATOR_CHARACTER_LIMIT}.`}
                                                                target="_blank"
                                                                href={`https://www.bing.com/translator?from=${language}&to=ru&text=${allSentences.slice(0, MICROSOFT_BING_TRANSLATOR_CHARACTER_LIMIT)}&op=translate`}>
                                                                <MicrosoftBingTranslator />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <ToolbarSeparator />
                                                </>
                                            )
                                    }
                                    <div>
                                        <div
                                            style={{
                                                fontSize: "var(--size_xs)",
                                                marginBottom: "var(--spacing_l)",
                                            }}
                                        >Dictionaries</div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "var(--spacing_l)",
                                            }}
                                        >
                                            <a
                                                title="Open Wikisłownik dicitonary article"
                                                target="_blank"
                                                href={`https://pl.wiktionary.org/wiki/${lemma}`}>
                                                <img src="https://pl.wiktionary.org/static/favicon/piece.ico" height={20} width={20} alt="Wikisłownik" />
                                            </a>
                                            <a
                                                title="Open WSJP dicitonary article"
                                                target="_blank"
                                                href={`https://wsjp.pl/szukaj/podstawowe/wyniki?szukaj=${lemma}`}>
                                                <img src="https://wsjp.pl/img/favicon/favicon.ico" height={20} width={20} alt="WSJP" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                    {
                        sentences.map((sentence, i) => (
                            <div
                                key={`${lemma}${i}`}
                                style={{
                                    borderRadius: "var(--border-radius_m)",
                                    marginBottom: "20px",
                                    backgroundColor: "var(--bg-default)",
                                    paddingLeft: "var(--size_xs)",
                                    paddingRight: "var(--size_xs)",
                                    paddingTop: "0.5em",
                                    paddingBottom: "0.5em",
                                }}

                            >
                                <div >
                                    <div
                                        style={{
                                            marginBottom: "0.5em",
                                        }}
                                    >
                                        {sentence.text}
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                        }}
                                    >
                                        <a
                                            style={{
                                                fontSize: "var(--size_xs)",
                                                color: "var(--text-ghost)",
                                                marginLeft: "auto",
                                            }}
                                            title="Open source"
                                            target="_blank"
                                            href={sentence.source}
                                        >
                                            Source
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </section>
            </div>
        </div>
    )
}
