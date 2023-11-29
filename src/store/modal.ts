// Utilities
import { defineStore } from "pinia";

export const useModalStore = defineStore("Modal", {
  state: () => ({
    visible: false,
    color: "primary" as Color,
    message: "",
    title: undefined as string | undefined,
  }),
  getters: {
    btnColor: (state) => {
      let c = "";
      switch (state.color) {
        case "error":
          c = "white";
          break;
        default:
          c = "black";
          break;
      }
      return c;
    },
  },
  actions: {
    showDialog(message: string, level = "alert") {
      this.visible = true;
      this.message = message;
      switch (level) {
        case "alert":
          this.color = "error";
          this.title = "Fehler";
          break;
        case "warning":
          this.color = "warning";
          break;
        case "info":
          this.color = "info";
          break;

        default:
          this.color = "primary";
      }
    },
    closeDialog() {
      this.visible = false;
      this.message = "";
      this.color = "primary";
      this.title = undefined;
    },
  },
});

type Color = "error" | "primary" | "secondary" | "info" | "success" | "warning";
