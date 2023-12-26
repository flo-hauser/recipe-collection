<template>
  <div v-if="!editMode" class="mb-8 d-flex justify-space-around">
    <v-btn :variant="bookBtnVariant" @click.stop="onToggleBookMag">
      Buch
    </v-btn>
    <v-btn :variant="magBtnVariant" @click.stop="onToggleBookMag"> Heft </v-btn>
  </div>
  <v-form v-model="form" @submit.prevent="onSaveBook">
    <v-text-field
      v-model="store.title"
      :rules="[rules.required]"
      class="mb-2"
      clearable
      label="Titel"
    ></v-text-field>

    <v-text-field
      v-if="store.isBook"
      v-model="store.author"
      class="mb-2"
      clearable
      label="Autor"
    ></v-text-field>

    <v-text-field
      v-model="store.year"
      type="number"
      :rules="[rules.year]"
      class="mb-2"
      clearable
      label="Jahr"
    ></v-text-field>

    <v-text-field
      v-if="store.isMagazine"
      v-model="store.issue"
      class="mb-2"
      clearable
      label="Ausgabe"
    ></v-text-field>

    <v-btn
      :disabled="!form"
      block
      color="success"
      size="large"
      type="submit"
      variant="elevated"
    >
      Speichern
    </v-btn>

    <v-btn
      v-if="editMode"
      @click.left="onDeleteBook"
      block
      color="warning"
      size="large"
      variant="elevated"
      class="mt-4"
    >
      Löschen
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { BookCreate } from "@/types/dto/BookCreate";
import { useBookStore } from "@/store/book";

const store = useBookStore();

const form = ref(false);
const bookBtnVariant = computed(() => (store.isBook ? "elevated" : "outlined"));
const magBtnVariant = computed(() => (store.isBook ? "outlined" : "elevated"));

defineProps({
  editMode: Boolean,
});

const emit = defineEmits<{
  (e: "saveBook", book: BookCreate): void;
  (e: "deleteBook", bookId: number): void;
}>();

const rules = {
  required: (value: string) => !!value || "Field is required",
  year: (value: number) => (value > 1800 && value < 3000) || value == null,
};

function onToggleBookMag() {
  store.isBook = !store.isBook;
}

function onSaveBook() {
  const book = store.newBook;
  emit("saveBook", book);
}

function onDeleteBook() {
  if (store.id) {
    emit("deleteBook", store.id);
  }
}
</script>
