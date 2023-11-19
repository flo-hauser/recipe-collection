<template>
  <div>Edit Book {{ id }}</div>
</template>

<script setup lang="ts">
import { GeneralBook } from "@/types/dto/Book";

defineProps({
  id: String,
});
</script>
