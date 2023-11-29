<template>
  <v-slide-x-transition class="py-0" group tag="v-alert">
    <v-alert
      v-for="msg in store.messages"
      :key="msg.id"
      :text="msg.message"
      :color="msg.messageType"
      class="mb-2"
    >
      <template v-slot:close>
        <v-btn @click="store.discardMessage(msg.id)">
          <v-icon icon="mdi-close"></v-icon>
        </v-btn>
      </template>
    </v-alert>
  </v-slide-x-transition>
</template>

<script setup lang="ts">
import { useMessageStore } from "@/store/messages";

const store = useMessageStore();
</script>
