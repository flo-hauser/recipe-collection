<template>
  <CenteredContainer>
    <v-sheet
      class="pa-12 mx-auto"
      rounded
      max-width="650px"
      color="lightSurface"
    >
      <h2 v-if="isBook" class="mb-12">Neues Kochbuch</h2>
      <h2 v-if="isMagazine" class="mb-12">Neues Magazin</h2>
      <div class="mb-8 d-flex justify-space-around">
        <v-btn :variant="bookBtnVariant" @click.stop="onToggleBookMag">
          Buch
        </v-btn>
        <v-btn :variant="magBtnVariant" @click.stop="onToggleBookMag">
          Heft
        </v-btn>
      </div>
      <v-form @submit.prevent="onAddBook">
        <v-text-field
          v-model="title"
          :rules="[rules.required]"
          class="mb-2"
          clearable
          label="Titel"
        ></v-text-field>

        <v-text-field
          v-if="isBook"
          v-model="author"
          class="mb-2"
          clearable
          label="Author"
        ></v-text-field>

        <v-text-field
          v-model="year"
          type="number"
          :rules="[rules.year]"
          class="mb-2"
          clearable
          label="Jahr"
        ></v-text-field>

        <v-text-field
          v-if="isMagazine"
          v-model="issue"
          class="mb-2"
          clearable
          label="Ausgabe"
        ></v-text-field>

        <v-btn
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Anlegen
        </v-btn>
      </v-form>
    </v-sheet>
  </CenteredContainer>
</template>

<script setup lang="ts">
import CenteredContainer from "@/components/CenteredContainer.vue";
import { ref, computed } from "vue";
import { BookCreate } from "@/types/dto/BookCreate";
import { useRecipeApi } from "@/composables/api";
import { useRouter } from "vue-router";

const router = useRouter();

const isBook = ref(true);
const isMagazine = computed(() => !isBook.value);
const bookBtnVariant = computed(() => (isBook.value ? "elevated" : "outlined"));
const magBtnVariant = computed(() => (isBook.value ? "outlined" : "elevated"));
const title = ref("");
const year = ref<number | null>(null);
const author = ref<string | null>(null);
const issue = ref<string | null>(null);

function onToggleBookMag() {
  isBook.value = !isBook.value;
}

const rules = {
  required: (value: string) => !!value || "Field is required",
  year: (value: number) => (value > 1800 && value < 3000) || value == null,
};

async function onAddBook() {
  const newBook: BookCreate = {
    type: isBook.value ? "cookbook" : "magazine",
    title: title.value,
  };

  if (author.value && isBook.value) {
    newBook.author = author.value;
  }
  if (issue.value && isMagazine.value) {
    newBook.issue = issue.value;
  }
  if (year.value) {
    newBook.year = year.value?.toString();
  }

  try {
    await useRecipeApi("books", "POST", newBook);
    router.push({ name: "allBooks" });
  } catch (e) {
    console.warn(e);
  }
}
</script>
