<template>
  <v-card width="400">
    <v-img :src="imgSrc" height="300" cover class="text-white"></v-img>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <h3>
        {{ bookTitle }}
        <span v-if="issue">{{ issue }}</span>
      </h3>
      <v-spacer></v-spacer>
      <p>Seite {{ page }}</p>
      <v-rating
        hover
        :length="5"
        :model-value="fakeRating"
        empty-icon="mdi-star-outline"
        full-icon="mdi-star"
        color="warning"
        active-color="warning"
        size="x-large"
        density="comfortable"
      />
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn
        @click.left="
          router.push({
            name: 'editRecipe',
            params: {
              id: props.recipe.id,
            },
          })
        "
        variant="text"
        icon="mdi-pencil "
      >
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { Recipe } from "@/types/dto/Recipe";
import { computed, toRefs } from "vue";
import fallbackImg from "@/assets/example-image.jpg";
import { useBookListStore } from "@/store/bookList";
import router from "@/router";

const bookListStore = useBookListStore();

const fakeRating = computed(() => {
  return Math.floor(Math.random() * 5) + 1;
});

const props = defineProps<{
  recipe: Recipe;
}>();

const { title, page, image_path } = toRefs(props.recipe);

const imgSrc = computed(() => {
  if (image_path.value === "" || image_path.value === null) {
    return fallbackImg;
  } else {
    return image_path.value;
  }
});

const bookTitle = computed(() => {
  return bookListStore.getBookByLink(props.recipe._links.book)?.title;
});

const issue = computed(() => {
  return bookListStore.getBookByLink(props.recipe._links.book)?.issue;
});
</script>
