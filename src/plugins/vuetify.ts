/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "@fortawesome/fontawesome-free/css/all.css";

// Composables
import { createVuetify } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#F1F8E9",
          primary: "#8BC34A",
          secondary: "#33691E",
          surface: "#33691E",
          error: "#B71C1C",
          info: "#90A4AE",
          success: "#8BC34A",
          warning: "#fb8c00",
          lightSurface: "#DCEDC8",
        },
      },
    },
  },
  icons: {
    aliases,
    sets: {
      fa,
    },
  },
});
