<template>
  <div>
    <v-list>
      <v-list-item
        v-for="book in store.bookList"
        :key="book.id"
        class="mb-2"
        :to="{
          name: 'editBook',
          params: {
            id: book.id,
          },
        }"
      >
        <template v-slot:prepend>
          <v-icon
            :icon="
              book.type == 'cookbook' ? 'fa:fas fa-book' : 'fa:fas fa-book-open'
            "
          ></v-icon>
        </template>
        <v-list-item-title>{{ book.title }}</v-list-item-title>
        <v-list-item-subtitle>{{
          book.type == "cookbook" ? book.author : book.issue
        }}</v-list-item-subtitle>
        <template v-slot:append>
          <v-icon icon="mdi-pencil" class="pe-6"></v-icon>
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

const store = useBookListStore();

onMounted(async () => {
  store.getBooks();
});

function newBook() {
  router.push({ name: "newBook" });
}
</script>
