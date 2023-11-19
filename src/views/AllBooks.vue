<template>
  <div>
    <ul>
      <li v-for="book in books" :key="book.id">{{ book.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRecipeApi } from "@/composables/api";
import { Book } from "@/types/dto/Book";
import { onMounted } from "vue";
import { ref } from "vue";

const books = ref<Array<Book>>([]);

onMounted(async () => {
  books.value = await useRecipeApi<Array<Book>>("books");
});
</script>
