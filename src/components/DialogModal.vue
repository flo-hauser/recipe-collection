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
        <v-row>
          <v-col class="d-flex align-start">
            <v-btn
              :color="store.btnColor"
              @click="store.closeDialog()"
              variant="outlined"
            >
              <span v-if="store.confirmAction">Abbrechen</span>
              <span v-else>Schließen</span>
            </v-btn>
            <v-spacer></v-spacer>
          </v-col>
          <v-col class="d-flex align-end" v-if="store.confirmAction">
            <v-spacer></v-spacer>
            <v-btn
              @click.stop="
                store.confirmAction();
                store.closeDialog();
              "
              :color="store.btnColor"
              variant="outlined"
              >Ok</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { useModalStore } from "@/store/modal";

const store = useModalStore();
</script>
