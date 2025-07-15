export default {
  defaultLocale: "en",
  locales: ["en", "ja", "zh", "zh-TW", "ko"],
  load: ["server", "client"],
  i18nextServer: {
    debug: false,
    initImmediate: false,
    backend: {
      loadPath: "./src/locales/{{lng}}/{{ns}}.json",
    },
  },
  i18nextClient: {
    debug: false,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  },
};