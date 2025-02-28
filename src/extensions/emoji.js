import { Node } from '@tiptap/core';
import EmojiActionButton from '../components/EmojiActionButton.vue';
import { Context } from "olotap";

export const Emoji = Node.create({
  name: 'emoji',
  addOptions() {
    const { state } = Context.useContext();
    return {
      ...this.parent?.(),
      button: ({ editor }) => ({
        component: EmojiActionButton,
        componentProps: {
          editor,
          action: (emoji) => {
            if (typeof emoji === 'string') editor.chain().focus().insertContent(emoji).run();
          },
          isActive: () => editor.isActive('emoji') || false,
          icon: 'mdi-emoticon-outline',
          tooltip: state.t('editor.emoji.tooltip')
        }
      })
    };
  }
});

export default Emoji;
