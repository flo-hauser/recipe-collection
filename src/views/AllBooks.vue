<template>
  <div>
    <v-list>
      <v-list-item v-for="book in store.bookList" :key="book.id" class="mb-2">
        <template v-slot:prepend>
          <v-icon
            :icon="
              book.type == 'cookbook' ? 'fa:fas fa-book' : 'fa:fas fa-book-open'
            "
          ></v-icon>
        </template>
        <div class="book-list-title">
          <v-list-item-title class="book-title">
            {{ book.title }}
          </v-list-item-title>
          <v-list-item-title
            v-if="book._links.recipes.length > 0"
            @click.stop="searchByBook(book.id)"
            class="clickable"
          >
            {{ book._links.recipes.length }} Rezepte
          </v-list-item-title>
        </div>

        <v-list-item-subtitle>{{
          book.type == "cookbook" ? book.author : book.issue
        }}</v-list-item-subtitle>
        <template v-slot:append>
          <div class="book-controls">
            <v-btn
              v-if="book._links.recipes.length > 0"
              @click.stop="searchByBook(book.id)"
              icon="mdi-magnify"
              variant="tonal"
            />
            <v-btn
              @click.stop="editBook(book.id)"
              icon="mdi-pencil"
              variant="tonal"
            />
          </div>
        </template>
      </v-list-item>
      <v-list-item :to="{ name: 'newBook' }">
        <template v-slot:append>
          <v-btn icon="mdi-plus" variant="tonal" @click.left="newBook"> </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { onMounted } from "vue";
import { useBookListStore } from "@/store/bookList";
import { useSearchStore } from "@/store/search";

const store = useBookListStore();
const searchStore = useSearchStore();

onMounted(async () => {
  store.getBooks();
});

function newBook() {
  router.push({ name: "newBook" });
}

async function searchByBook(bookId: number) {
  searchStore.$reset();
  searchStore.searchItem = {
    id: bookId,
    item: "book",
  };
  await searchStore.searchByBook();
  router.push({ name: "search" });
}

function editBook(bookId: number) {
  console.log(bookId);
  router.push({ name: "editBook", params: { id: bookId.toString() } });
}
</script>

<style scoped>
.book-controls {
  display: flex;
  gap: 1rem;
}

.book-title {
  padding-right: 3rem;
}

.book-list-title {
  display: flex;
}

@media screen and (max-width: 750px) {
  .book-list-title {
    flex-direction: column;
  }
  .book-title {
    padding-right: 0;
  }
}

.clickable {
  cursor: pointer;
  text-decoration: underline 0.15em rgba(0, 0, 0, 0);
  transition: text-decoration-color 200ms ease-in-out;
}

.clickable:hover {
  text-decoration-color: rgba(255, 255, 255, 0.7);
}
</style>
