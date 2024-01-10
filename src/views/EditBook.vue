<template>
  <CenteredContainer>
    <v-sheet
      class="px-12 pt-6 mx-auto"
      rounded
      max-width="650px"
      color="lightSurface"
    >
      <h2>{{ store.title }}</h2>
      <BookForm
        @save-book="updateBook"
        @delete-book="deleteBook"
        :edit-mode="true"
      ></BookForm>
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
import BookForm from "@/components/BookForm.vue";
import CenteredContainer from "@/components/CenteredContainer.vue";
import { useBookStore } from "@/store/book";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const store = useBookStore();
const router = useRouter();

const completed = ref(false);
const props = defineProps({
  id: String,
});

onMounted(async () => {
  await store.getBookById(Number(props.id));
});

async function updateBook() {
  await store.updateBook();
  completed.value = true;
  setTimeout(() => {
    router.push({ name: "allBooks" });
  }, 1000);
}

async function deleteBook(id: number) {
  await store.deleteBook(id);
  setTimeout(() => {
    completed.value = true;
    router.push({ name: "allBooks" });
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
