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
    <v-expansion-panels class="mb-4">
      <v-expansion-panel>
        <v-expansion-panel-title> Filter </v-expansion-panel-title>
        <v-expansion-panel-text>
          <!-- horitontal list of filter items-->
          <p>Hier kommen filter einstellungen</p>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

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
import { onMounted } from "vue";

const store = useSearchStore();

async function onSearch() {
  store.search();
}

onMounted(() => {
  store.searchRandom();
});
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
