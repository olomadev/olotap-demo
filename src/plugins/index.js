import i18n from "../i18n";
import { OlotapPlugin } from "olotap";
import vuetify from "./vuetify";
import "@mdi/font/css/materialdesignicons.css"; // material icons

/**
 * Main register function
 */
export async function registerPlugins(app) {

  app.use(i18n);
  app.use(vuetify);
  app.provide("vuetify", vuetify);

  const config = {
    i18n,
    t: i18n.global.t,
    defaultLang: i18n.global.locale.value,
    defaultMarkdownTheme: "default",
    editorUpdateThrottleWaitTime: 200,
    inputDensity: "compact",
    inputVariant: "outlined",
    inputClass: "",
    checkboxClass: "",
    imageMinSize: 20,
    imageMaxSize: 100000,
    imageThrottleWaitTime: 16,
    tableInitGridSize: 6,
    tableMaxGridSize: 10,
    tableDefaultSelectedGridSize: 2,
    colorsList: [
      "", // none
      "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5",
      "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50",
      "#8bc34a", "#cddc39", "#ffeb3b", "#ffc1a07", "#ff9800",
      "#ff5722", "#000000", "#333333", "#666666", "#999999",
      "#CCCCCC", "#D5D5D4", "#E8E8E8", "#EEEEEE",
    ],
    defaultFontFamilyValue: "Hanken Grotesk",
    defaultFontFamilyList: [
      { title: "default", value: "Hanken Grotesk", divider: true, default: true },
      { title: "Arial", value: "Arial" },
      { title: "Arial Black", value: "Arial Black" },
      { title: "Georgia", value: "Georgia" },
      { title: "Impact", value: "Impact" },
      { title: "Helvetica", value: "Helvetica" },
      { title: "Tahoma", value: "Tahoma" },
      { title: "Times New Roman", value: "Times New Roman" },
      { title: "Verdana", value: "Verdana" },
      { title: "Courier New", value: "Courier New", divider: true },
      { title: "Monaco", value: "Monaco" },
      { title: "Monospace", value: "monospace" },
    ],
    defaultMarkdownThemeValue: "github",
    defaultMarkdownThemeList: [{ title: "default", value: "github", default: true }],
    defaultFontSizeList: [8, 10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72],
    defaultFontSizeValue: "default",
    imageSize: {
      "size-small": 200,
      "size-medium": 500,
      "size-large": "100%",
    },
    videoSize: {
      "size-small": 480,
      "size-medium": 640,
      "size-large": "100%",
    },
    nodeTypeMenu: {
      image: [
        "float-left", "float-none", "float-right", "divider",
        "image-size-small", "image-size-medium", "image-size-large",
        "divider", "textAlign", "divider", "image",
        "image-aspect-ratio", "remove",
      ],
      text: ["bold", "italic", "underline", "strike", "divider", "color", "highlight", "textAlign", "divider", "link"],
      link: [
        "bold", "italic", "underline", "strike", "divider", "color", "highlight", "textAlign",
        "divider", "link", "unlink", "link-open",
      ],
      video: ["video-size-small", "video-size-medium", "video-size-large", "divider", "video", "remove"],
      codeBlock: ['paste-code', 'change-language', 'copy-code', 'remove'],
      horizontalRule: ['remove'],
      blockquote: ['remove'],
    },
  }
  await OlotapPlugin.install(app, config);
}
