<template>
  <v-img
    :src="store.imgSrc"
    class="mb-4"
    height="20rem"
    cover
    @click="onImageUpload"
  >
    <v-btn
      class="upload-btn"
      icon="mdi-upload"
      variant="elevated"
      @click.stop="onImageUpload"
    ></v-btn>
  </v-img>
  <v-form v-model="form" @submit.prevent="onSaveRecipe">
    <v-text-field
      v-model="store.title"
      :rules="[rules.required]"
      clearable
      label="Titel"
    ></v-text-field>

    <v-text-field
      v-model="store.page"
      clearable
      label="Seite"
      type="number"
    ></v-text-field>

    <v-select
      v-model="store.bookId"
      :items="bookListStore.getSelectItems"
      label="Kochbuch"
    ></v-select>

    <v-text-field
      label="Tags"
      v-model="tagInput"
      @update:model-value="onTagInput"
      @keydown.enter.prevent="
        tagInput = tagInput + ' ';
        onTagInput(tagInput);
      "
    ></v-text-field>

    <div class="tags-container">
      <v-fade-transition group leave-absolute>
        <v-chip
          v-for="tag in store.tags"
          :key="tag.tag_name"
          @click:close="onTagRemove(tag.tag_name)"
          closable
        >
          {{ tag.tag_name }}
        </v-chip>
      </v-fade-transition>
    </div>

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

    <v-file-input
      @update:modelValue="onFileInput"
      :multiple="false"
      prepend-icon=""
      label="Bild hochladen"
      accept="image/png, image/jpeg"
      clearable
      capture="enviroment"
      ref="fileInput"
      class="d-none"
    ></v-file-input>
  </v-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRecipeStore } from "@/store/recipe";
import { RecipeCreate } from "@/types/dto/RecipeCreate";
import { useBookListStore } from "@/store/bookList";

// general setup
const store = useRecipeStore();
const bookListStore = useBookListStore();
onMounted(() => {
  bookListStore.getBooks();
});
const form = ref(false);
const rules = {
  required: (value: string) => !!value || "Field is required",
};

// save and delete actions
defineProps({
  editMode: Boolean,
});
const emit = defineEmits<{
  (e: "saveRecipe", recipe: RecipeCreate): void;
  (e: "deleteRecipe", recipeId: number): void;
}>();

const onSaveRecipe = () => {
  if (tagInput.value.trim().length > 0) {
    store.tags.push({ tag_name: tagInput.value.trim().replace("#", "") });
  }
  const recipe = store.newRecipe;
  emit("saveRecipe", recipe);
};
const onDeleteRecipe = () => {
  if (store.id) {
    emit("deleteRecipe", store.id);
  }
};

// tag input actions
const tagInput = ref("");
const onTagInput = (input: string) => {
  // if input is space, push input to tag list and clear input
  if (input.endsWith(" ") && input.trim().length > 0) {
    store.pushTag(input);
    tagInput.value = "";
  }
};
const onTagRemove = (tag: string) => {
  store.tags = store.tags.filter((t) => t.tag_name !== tag);
};

// file input actions
const fileInput = ref<HTMLElement | null>(null);
const onFileInput = (files: Array<File>) => {
  if (files) {
    store.newImageFile = files[0];
  }
};
const onImageUpload = () => {
  fileInput.value?.click();
};
</script>

<style scoped>
.upload-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.7rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
