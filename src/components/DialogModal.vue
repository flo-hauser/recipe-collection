<template>
  <v-dialog v-model="store.visible" width="auto">
    <v-card :color="store.color">
      <v-card-item v-if="store.title">
        <v-card-title>{{ store.title }}</v-card-title>
      </v-card-item>
      <v-card-text>
        {{ store.message }}
      </v-card-text>
      <v-card-actions class="px-5 mb-4">
        <v-btn
          :color="store.btnColor"
          block
          @click="store.closeDialog()"
          variant="outlined"
        >
          Schließen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { useModalStore } from "@/store/modal";

const store = useModalStore();
</script>
