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
    <v-pagination
      v-if="totalItems > 0 && numberOfPages > 1"
      v-model="currentPage"
      :length="numberOfPages"
      total-visible="5"
      class="mb-4"
    ></v-pagination>
    <div class="search-results">
      <v-fab-transition group leave-absolute>
        <RecipeCard
          v-for="recipe of paginatedItems"
          :key="recipe.id"
          :recipe="recipe"
        ></RecipeCard>
      </v-fab-transition>
    </div>
    <v-pagination
      v-if="totalItems > 0 && numberOfPages > 1"
      v-model="currentPage"
      :length="numberOfPages"
      total-visible="5"
      class="my-4"
    ></v-pagination>
  </div>
</template>

<script setup lang="ts">
import RecipeCard from "@/components/RecipeCard.vue";
import { useSearchStore } from "@/store/search";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { usePagination } from "@/composables/usePagination";
import { useDisplay } from "vuetify";
import { Recipe } from "@/types/dto/Recipe";

const store = useSearchStore();
const { result } = storeToRefs(store);

const currentPage = ref(1);
const { sm, xs } = useDisplay();
const rowsPerPage = ref(12);
const { paginatedItems, totalItems, numberOfPages } = usePagination<Recipe>({
  currentPage,
  rowsPerPage,
  arrayToPaginate: result,
});

async function onSearch() {
  await store.search();
  currentPage.value = 1;
}

onMounted(() => {
  store.searchRandom();
  // resize event listener
  window.addEventListener("resize", onResize);
  onResize();
});

const onResize = () => {
  // set rowsPerPage depending on screen size
  if (sm.value) {
    rowsPerPage.value = 6;
  } else if (xs.value) {
    rowsPerPage.value = 3;
  } else {
    rowsPerPage.value = 12;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  justify-items: center;
  gap: 2rem 0.5rem;
}
</style>
