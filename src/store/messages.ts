// Utilities
import { defineStore } from "pinia";
import { Message, MessageType } from "@/types/Message";

export const useMessageStore = defineStore("message", {
  state: () => ({
    messages: [] as Array<Message>,
    nextId: 0,
  }),

  actions: {
    showMessage(message: string, messageType: MessageType) {
      this.messages.push({
        id: this.nextId,
        message,
        messageType,
        visible: true,
      });
      this.nextId++;
    },

    discardMessage(id: number) {
      this.messages = this.messages.filter((msg) => msg.id !== id);
    },
  },
});
