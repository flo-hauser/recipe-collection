<template>
  <v-img
    :src="store.imgSrc"
    class="mb-4"
    height="20rem"
    cover
    @click="onImageClick"
  />
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

    <v-file-input
      @update:modelValue="onFileInput"
      :multiple="false"
      prepend-icon=""
      label="Bild hochladen"
      accept="image/png, image/jpeg"
      clearable
      capture="enviroment"
      ref="fileInput"
    ></v-file-input>

    <v-rating
      v-model="store.rating"
      :length="5"
      hover
      empty-icon="mdi-star-outline"
      full-icon="mdi-star"
      color="warning"
      active-color="warning"
      size="x-large"
      density="comfortable"
    />

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
import { ref, onMounted } from "vue";
import { useRecipeStore } from "@/store/recipe";
import { RecipeCreate } from "@/types/dto/RecipeCreate";
import { useBookListStore } from "@/store/bookList";

const store = useRecipeStore();
const bookListStore = useBookListStore();
onMounted(() => {
  bookListStore.getBooks();
});

const form = ref(false);
const fileInput = ref<HTMLElement | null>(null);

const onFileInput = (files: Array<File>) => {
  if (files) {
    store.newImageFile = files[0];
  }
};

const onImageClick = () => {
  fileInput.value?.click();
};

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
