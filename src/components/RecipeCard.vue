<script setup lang="ts">
import { Recipe } from "@/types/dto/Recipe";
import { computed, toRefs } from "vue";
import fallbackImg from "@/assets/example-image.jpg";

const props = defineProps<{
  recipe: Recipe;
}>();

const { id, title, page, image_path } = toRefs(props.recipe);

const imgSrc = computed(() => {
  if (image_path.value === "" || image_path.value === null) {
    return fallbackImg;
  } else {
    return image_path.value;
  }
});
</script>

<template>
  <v-sheet
    :elevation="5"
    :height="200"
    width="80%"
    class="recipe-card"
    rounded
    color="lightSurface"
  >
    <div class="img-container">
      <v-img
        width="100%"
        height="100%"
        aspect-ratio="1/1"
        cover
        :src="imgSrc"
      ></v-img>
    </div>
    <div class="content-container py-4">
      <h3>{{ title }}</h3>
      <p>Seite {{ page }}</p>
      <p>{{ id }}</p>
    </div>
  </v-sheet>
</template>

<style scoped>
.recipe-card {
  display: flex;
  justify-content: space-between;
}

.recipe-card .img-container {
  width: 30%;
}

.recipe-card .content-container {
  width: 65%;
}
</style>
