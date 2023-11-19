<template>
  <div>
    <h1>Rezeptesuche</h1>
    <v-text-field
      v-model="searchTerm"
      label="Suche"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      @keyup.enter="onSearch"
    >
      <template v-slot:append-inner>
        <v-btn @click.stop="onSearch">Suche</v-btn>
      </template>
    </v-text-field>

    <div class="search-results">
      <RecipeCard
        v-for="recipe of searchResults"
        :key="recipe.id"
        :recipe="recipe"
      ></RecipeCard>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { Recipe } from "@/types/dto/Recipe";
import RecipeCard from "@/components/RecipeCard.vue";
import { useRecipeApi } from "@/composables/api";

export default {
  setup() {
    const searchTerm = ref("");
    const searchResults = ref<Array<Recipe>>([]);

    async function onSearch() {
      searchResults.value = [];

      searchResults.value = await useRecipeApi<Array<Recipe>>("/recipes");
    }

    return { searchTerm, searchResults, onSearch };
  },
  components: {
    RecipeCard,
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 3rem;
}

@media screen and (max-width: 960px) {
  h1 {
    margin-bottom: 1rem;
  }
}

.search-results {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 2rem;
}
</style>
