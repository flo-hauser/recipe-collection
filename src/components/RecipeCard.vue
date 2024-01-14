<template>
  <v-card width="400" variant="elevated" elevation="8">
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
        v-model="rating"
        @click.stop="rateRecipe(rating)"
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
import router from "@/router";
import urlJoin from "url-join";
import { useBookListStore } from "@/store/bookList";
import { useRecipeStore } from "@/store/recipe";
import { apiHost } from "@/composables/api";
import fallbackImg from "@/assets/example-image.jpg";

const bookListStore = useBookListStore();
const recipeStore = useRecipeStore();

const props = defineProps<{
  recipe: Recipe;
}>();

const { title, page, rating } = toRefs(props.recipe);

const imgSrc = computed(() => {
  if (!props.recipe._links.image) {
    return fallbackImg;
  } else {
    return urlJoin(apiHost, props.recipe._links.image);
  }
});

const bookTitle = computed(() => {
  return bookListStore.getBookByLink(props.recipe._links.book)?.title;
});

const issue = computed(() => {
  return bookListStore.getBookByLink(props.recipe._links.book)?.issue;
});

async function rateRecipe(newRating: number) {
  await recipeStore.getRecipeById(props.recipe.id);
  const updatedRecipe = await recipeStore.rateRecipe(newRating);
  if (updatedRecipe) {
    rating.value = updatedRecipe.rating;
  }
}
</script>
