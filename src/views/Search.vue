<template>
  <div>
    <v-text-field
      v-model="store.searchTerm"
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
      <v-fab-transition group leave-absolute>
        <RecipeCard
          v-for="recipe of store.result"
          :key="recipe.id"
          :recipe="recipe"
        ></RecipeCard>
      </v-fab-transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import RecipeCard from "@/components/RecipeCard.vue";
import { useSearchStore } from "@/store/search";

const store = useSearchStore();

async function onSearch() {
  store.search();
}
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  justify-items: center;
  gap: 2rem 0.5rem;
}
</style>
