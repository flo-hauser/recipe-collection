<template>
  <div>
    <v-list>
      <v-list-item
        v-for="book in books"
        :key="book.id"
        variant="plain"
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
          <v-icon icon="mdi-pencil"></v-icon>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { useRecipeApi } from "@/composables/api";
import { GeneralBook } from "@/types/dto/Book";
import { onMounted } from "vue";
import { ref } from "vue";

const books = ref<Array<GeneralBook>>([]);

onMounted(async () => {
  books.value = await useRecipeApi<Array<GeneralBook>>("books");
});
</script>
