<template>
  <CenteredContainer>
    <v-sheet
      class="px-12 pt-6 mx-auto"
      rounded
      max-width="650px"
      color="lightSurface"
    >
      <h2>
        Neues
        <span v-if="bookStore.isBook">Kochbuch</span>
        <span v-else>Magazin</span>
      </h2>
      <BookForm @save-book="addBook"></BookForm>
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
import { useRouter } from "vue-router";
import { useBookStore } from "@/store/book";
import { onBeforeMount, ref } from "vue";
import { useBookListStore } from "@/store/bookList";

const bookStore = useBookStore();
const bookListStore = useBookListStore();
const router = useRouter();

const completed = ref(false);

onBeforeMount(() => {
  bookStore.$reset();
});

async function addBook() {
  try {
    const addedBook = await bookStore.postBook();
    bookListStore.bookList.push(addedBook);
    completed.value = true;
    setTimeout(() => {
      router.push({ name: "allBooks" });
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
