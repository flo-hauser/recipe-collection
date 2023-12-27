<template>
  <CenteredContainer>
    <v-sheet
      class="pa-12 mx-auto"
      rounded
      max-width="650px"
      color="lightSurface"
    >
      <h2>{{ store.title }}</h2>
      <RecipeForm
        @save-recipe="updateRecipe"
        @delete-recipe="deleteRecipe"
        :edit-mode="true"
      ></RecipeForm>
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
import RecipeForm from "@/components/RecipeForm.vue";
import CenteredContainer from "@/components/CenteredContainer.vue";
import { useRecipeStore } from "@/store/recipe";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useSearchStore } from "@/store/search";

const store = useRecipeStore();
const router = useRouter();

const completed = ref(false);
const props = defineProps({
  id: String,
});

onMounted(async () => {
  await store.getRecipeById(Number(props.id));
});

async function updateRecipe() {
  await store.updateRecipe();
  completed.value = true;
  useSearchStore().search();
  setTimeout(() => {
    router.push({ name: "search" });
  }, 1000);
}

async function deleteRecipe(id: number) {
  await store.deleteRecipe(id);
  completed.value = true;
  useSearchStore().search();
  setTimeout(() => {
    router.push({ name: "search" });
  }, 500);
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
