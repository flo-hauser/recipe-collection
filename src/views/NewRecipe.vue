<template>
  <CenteredContainer>
    <v-sheet
      class="px-12 pt-6 mx-auto"
      rounded
      max-width="650px"
      color="lightSurface"
    >
      <h2>Neues Rezept</h2>

      <RecipeForm @save-recipe="addRecipe"></RecipeForm>

      <div class="confirmed-icon">
        <v-scale-transition>
          <div v-show="completed">
            <v-icon id="confirmed-register" color="primary">
              mdi-check-circle
            </v-icon>
          </div>
        </v-scale-transition>
      </div>
    </v-sheet>
  </CenteredContainer>
</template>

<script setup lang="ts">
import CenteredContainer from "@/components/CenteredContainer.vue";
import RecipeForm from "@/components/RecipeForm.vue";
import { useRecipeStore } from "@/store/recipe";
import { useSearchStore } from "@/store/search";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useRecipeStore();
const searchStore = useSearchStore();

const completed = ref(false);

onBeforeMount(() => {
  store.$reset();
});

async function addRecipe() {
  try {
    await store.postRecipe();
    completed.value = true;
    searchStore.searchTerm = store.recipe.title;
    searchStore.search();
    setTimeout(() => {
      router.push({ name: "search" });
    }, 1000);
  } catch (e) {
    console.warn(e);
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 2rem;
}

.confirmed-icon {
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: end;
}
</style>
