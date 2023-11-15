<template>
  <div>
    <h1>Rezeptesuche</h1>
    <v-text-field v-model="searchTerm" label="Suche" prepend-inner-icon="mdi-magnify" variant="outlined">
      <template v-slot:append-inner>
        <v-btn @click.stop="onSearch">Suche</v-btn>
      </template>
    </v-text-field>

    {{ searchTerm }}

    <div class="search-results">
      <RecipeCard v-for="recipe of searchResults" :key="recipe.id" :recipe="recipe"></RecipeCard>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { Recipe } from "@/types/dto/Recipe"
import recipes from "@/resources/examples/recipes.json"
import RecipeCard from "@/components/RecipeCard.vue"

function loadRecipes() {
  const promise = new Promise<Array<Recipe>>((resolve) => {
    setTimeout(() => {
      resolve(recipes as Array<Recipe>);
    }, 500);
  });

  return promise;
}

export default {
  setup() {
    const searchTerm = ref("");
    const searchResults = ref<Array<Recipe>>([]);

    function onSearch() {
      searchResults.value = [];

      const mockedServerResponse = loadRecipes();
      mockedServerResponse.then(res => {
        searchResults.value = res;
      });
    }

    return { searchTerm, searchResults, onSearch };
  },
  components: {
    RecipeCard
  }
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
