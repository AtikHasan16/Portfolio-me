import React, { useState, useEffect } from "react";
import en from "../locales/en.json";
import bn from "../locales/bn.json";
import zh from "../locales/zh.json";
import ar from "../locales/ar.json";
import { availableLanguages } from "./languages";
import { LanguageContext } from "./LanguageContextInstance";

const dictionaries = { en, bn, zh, ar };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem("atik_portfolio_lang") || "en";
  });

  const setLanguage = (langCode) => {
    if (dictionaries[langCode]) {
      setLanguageState(langCode);
      localStorage.setItem("atik_portfolio_lang", langCode);
    }
  };

  useEffect(() => {
    const activeLang = availableLanguages.find((l) => l.code === language) || availableLanguages[0];
    document.documentElement.lang = activeLang.code;
    document.documentElement.dir = activeLang.dir;
  }, [language]);

  const t = (path) => {
    if (!path) return "";
    const keys = path.split(".");

    let current = dictionaries[language];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        current = null;
        break;
      }
    }

    if (current !== null && current !== undefined) {
      return current;
    }

    // Fallback to English
    let fallback = dictionaries.en;
    for (const key of keys) {
      if (fallback && fallback[key] !== undefined) {
        fallback = fallback[key];
      } else {
        return path;
      }
    }
    return fallback !== undefined ? fallback : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
