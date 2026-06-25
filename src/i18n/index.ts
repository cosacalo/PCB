import { en } from './en';
import { es } from './es';

export type Lang = 'en' | 'es';

export const ui = { en, es } as const;
export const defaultLang: Lang = 'en';
export const locales: Lang[] = ['en', 'es'];

// Home path per language, base-path aware (root deploy => '' base).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const routes: Record<Lang, string> = {
  en: `${base}/`,
  es: `${base}/es/`,
};

// Booking page path per language, base-path aware.
export const bookRoutes: Record<Lang, string> = {
  en: `${base}/book`,
  es: `${base}/es/book`,
};

export function useT(lang: Lang) {
  return ui[lang] ?? ui[defaultLang];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'es' : 'en';
}
