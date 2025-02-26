// Styles
import "vuetify/styles";

// Translations provided by Vuetify
import { en, tr } from "vuetify/locale";
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Composables
import { createVuetify } from "vuetify";

// Vuetify 
export default createVuetify({
  locale: {
    locale: "en",
    fallback: "en",
    messages: { tr, en },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#f0f0f1",
          surface: "#ffffff",
          primary: "#0a7248",
          secondary: "#eeeeee",
          error: "#ed0505",
          info: "#00CAE3",
          // success: '#4CAF50',
          // warning: '#FB8C00',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',  // background
          surface: '#1E1E1E',      // cards vb.
          primary: '#403f3f',      // main color in gray tone
          secondary: '#494b4d',    // lighter gray
          accent: '#7a7c7d',       // accent gray
          error: '#CF6679',
          info: '#607D8B',         // blue-gray
          success: '#4CAF50',
          warning: '#FB8C00'
        }
      }
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
