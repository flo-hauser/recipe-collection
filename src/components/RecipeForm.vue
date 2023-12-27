<template>
  <v-form v-model="form" @submit.prevent="onSaveRecipe">
    <v-text-field
      v-model="store.title"
      :rules="[rules.required]"
      class="mb-2"
      clearable
      label="Titel"
    ></v-text-field>

    <v-text-field
      v-model="store.page"
      class="mb-2"
      clearable
      label="Seite"
      type="number"
    ></v-text-field>

    <v-select
      v-model="store.bookId"
      :items="bookListStore.getSelectItems"
      label="Kochbuch"
    ></v-select>

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
      @click.left="onDeleteRecipe"
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
import { ref } from "vue";
import { useRecipeStore } from "@/store/recipe";
import { RecipeCreate } from "@/types/dto/RecipeCreate";
import { useBookListStore } from "@/store/bookList";
import { onMounted } from "vue";

const store = useRecipeStore();
const bookListStore = useBookListStore();
onMounted(() => {
  bookListStore.getBooks();
});

const form = ref(false);

defineProps({
  editMode: Boolean,
});

const emit = defineEmits<{
  (e: "saveRecipe", recipe: RecipeCreate): void;
  (e: "deleteRecipe", recipeId: number): void;
}>();

const rules = {
  required: (value: string) => !!value || "Field is required",
};

function onSaveRecipe() {
  const recipe = store.newRecipe;
  emit("saveRecipe", recipe);
}

function onDeleteRecipe() {
  if (store.id) {
    emit("deleteRecipe", store.id);
  }
}
</script>
