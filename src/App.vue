<template>
  <div class="mt-5">
    <OlotapEditor 
      v-if="created && extensions.length > 0"
      :extensions="extensions"
      ref="editorRef"
      :key="getEditorKey"
      v-model="model.contentJson"
      v-model:markdown-theme="markdownTheme"
      output="json"
      :error-messages="errorMessages"
      :min-height="600"
      max-height="600"
      max-width="900"
      @change="onChange"
    >
    </OlotapEditor>

    <div class="mt-5 mb-5" v-if="!isFullscreen">
      <div class="d-flex gap-4">
        <v-btn color="primary" @click="getJsonOutput" class="mr-5">Get JSON Output</v-btn>
        <v-btn color="primary" @click="getHtmlOutput" class="mr-5">Get HTML Output</v-btn>
        <v-btn color="primary" @click="toggleTheme" class="mr-5">{{ $vuetify.theme.current.dark ? 'dark theme' : 'light theme' }}</v-btn>
        <v-row>
          <v-col cols="3">
            <v-select
              color="primary"
              density="compact"
              variant="outlined"
              label="Select Language"
              :items="['en', 'tr']"
              v-model="lang"
            ></v-select>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- JSON Output Dialog -->
    <v-dialog v-model="jsonDialog" max-width="600">
      <v-card>
        <v-card-title class="headline">JSON Output</v-card-title>
        <v-card-text>
          <pre>{{ dialogJsonOutput }}</pre>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="jsonDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- HTML Output Dialog -->
    <v-dialog v-model="htmlDialog" max-width="600">
      <v-card>
        <v-card-title class="headline">HTML Output</v-card-title>
        <v-card-text>
          <pre><code v-html="dialogHtmlOutput"></code></pre>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="htmlDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import i18n from "@/i18n";
import "olotap/classic-editor.css";
import { OlotapEditor, defaultBubbleList, Context } from "olotap";
import defaultContentJson from '@/content.json';

export default {
  name: 'App',
  components: {
    OlotapEditor
  },
  data() {
    return {
      lang: "en",
      dialogHtmlOutput: null,
      dialogJsonOutput: null,
      jsonDialog: false,
      htmlDialog: false,
      model: {
        contentJson: null,
        contentHtml: null
      },
      errorMessages: [],
      markdownTheme: "default",
      editorKey: "editor_",
      extensions: [],
    };
  },
  created() {
    this.model.contentJson = defaultContentJson;
    this.created = false;
    this.createExtensions();
    this.created = true;
  },
  watch: {
    lang(val) {
      i18n.global.locale.value = val;
      this.createExtensions(); // re create extension for new locale
    }
  },
  computed: {
    isFullscreen() {
      return Context.useContext().state.isFullscreen;
    },
    getEditorKey() {
      return "olotap_" + i18n.global.locale.value;
    }
  },
  methods: {
    createExtensions() {
      const {
        BaseKit,
        History,
        Bold,
        Italic,
        Underline,
        Strike,
        Heading,
        TextAlign,
        FontFamily,
        FontSize,
        Color,
        Highlight,
        Clear,
        BulletList,
        OrderedList,
        Indent,
        Link,
        Image,
        Video,
        Table,
        Blockquote,
        HorizontalRule,
        CodeBlock,
        // Fullscreen,
      } = this.$extensions;

      this.extensions = [
        BaseKit.configure({
          placeholder: {
            placeholder: this.$t("editor.placeholder")
          },
          bubble: {
            // default config
            list: {
              image: [ 'float-left', 'float-none', 'float-right', 'divider', 'image-size-small', 'image-size-medium', 'image-size-large', 'divider', 'textAlign', 'divider', 'image', 'image-aspect-ratio', 'remove'],
              text: ['bold', 'italic', 'underline', 'strike', 'divider', 'color', 'highlight', 'textAlign', 'divider', 'link'],
              video: ['video', 'video-size-small', 'video-size-medium', 'video-size-large', 'remove'],
              codeBlock: ['paste-code', 'change-language', 'copy-code', 'remove'],
              horizontalRule: ['remove'],
              blockquote: ['remove'],
            },
            defaultBubbleList: editor => {
              // You can customize the bubble menu here
              const defaultBubble = defaultBubbleList(editor)
              return defaultBubble; // default customize bubble list
            }
          }
        }),
        History.configure({ divider: true  }),
        FontFamily.configure({ divider: true }),
        FontSize.configure({ divider: true }),
        Bold,
        Italic,
        Underline,
        Strike,
        Heading,
        TextAlign.configure({ defaultAlignment: 'left', types: ['heading', 'paragraph', 'image', 'blockquote', 'div'] }),
        Clear.configure({ divider: true }),
        Color,
        Highlight.configure({ divider: true }),
        BulletList.configure({
          HTMLAttributes: {
            class: 'list-disc pl-5',
          },
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: 'list-decimal pl-5',
          },
        }),
        Indent.configure({ divider: true }),
        Link.configure({ divider: false }),
        Image.configure({
          // imageTabs: [],  // { name: 'SELECT', component: markRaw(SelectImage) }
          // hiddenTabs: ['upload'],
          upload(file) {
            const url = URL.createObjectURL(file)
            console.log('mock upload api :&gt;&gt; ', url)
            return Promise.resolve(url)
          }
        }),
        Video,
        Table.configure({ divider: true }),
        Blockquote,
        HorizontalRule,
        CodeBlock,
        // Fullscreen,
      ];
    },
    onChange(val) {
      // console.error(val)
    },
    escapeHtml(html) {
      return html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    },
    getHtmlOutput() {
      if (this.$refs.editorRef) {
        const rawHtml = this.$refs.editorRef.editor.getHTML();
        this.dialogHtmlOutput = this.escapeHtml(rawHtml);
        this.htmlDialog = true; // HTML dialogunu aç
      }
    },
    getJsonOutput() {
      if (this.$refs.editorRef) {
        this.dialogJsonOutput = JSON.stringify(this.model.contentJson, null, 2);
        this.jsonDialog = true;
      }
    },
    toggleTheme() {
      this.$vuetify.theme.global.name = this.$vuetify.theme.global.name === 'light' ? 'dark' : 'light'
    }
  }
};
</script>

<style scoped>
pre {
  background-color: #f6f8fa;
  color: #000;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>