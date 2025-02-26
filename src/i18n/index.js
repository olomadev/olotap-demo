import { createI18n } from "vue-i18n";
/**
 * app messages
 */
import _en from "./locales/en.json";
import _tr from "./locales/tr.json";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  legacy: false,
  globalInjection: true,
  // forceStringify: false,
  messages: { tr: _tr, en: _en },
  runtimeOnly: false,
});
/**
 * import locales
 */
export default i18n;