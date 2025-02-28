<template>
  <action-button
    :icon="icon" 
    :tooltip="tooltip" 
    :disabled="disabled"
    :is-active="isActive"
  >
    <v-menu
      v-model="menu"
      :nudge-left="50"
      :nudge-top="42"
      :close-on-content-click="false"
      transition="scale-transition"
      activator="parent"
    >
      <v-list>
        <v-sheet class="d-flex flex-wrap justify-between ma-1" fluid :max-width="230">
          <template v-for="emoji in getEmojiList" :key="emoji">
            <v-btn flat elevation="0" icon density="compact" @click="addEmoji(emoji)">
              {{ emoji }}
            </v-btn>
          </template>
        </v-sheet>
      </v-list>
    </v-menu>
  </action-button>
</template>

<script>
import { ActionButton } from "olotap";

export default {
  components: {
    ActionButton,
  },
  props: {
    editor: {
      type: Object,
      required: true
    },
    icon: {
      type: String,
      default: undefined
    },
    tooltip: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    action: {
      type: Function,
      default: undefined
    },
    isActive: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      menu: false,
      emojiList: [
        "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
        "😎", "😍", "😘", "😗", "😙", "😚", "🤗", "🤩", "🤔", "🤨",
        "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯",
        "😪", "😫", "🥱", "😴", "😌", "🤤", "😛", "😜", "😝", "🤪"
      ],
    };
  },
  computed: {
    getEmojiList() {
      return this.emojiList;
    }
  },
  methods: {
    addEmoji(emoji) {
      if (this.action) {
        this.action(emoji);
      }
    }
  }
};
</script>
