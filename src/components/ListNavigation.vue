<template>
  <v-list>
    <v-list-item type="subheader"><h4>Rezepte</h4></v-list-item>
    <v-list-item title="Suche" :to="{ name: 'search' }"></v-list-item>
    <v-list-item>Listen</v-list-item>
    <v-list-item :to="{ name: 'newRecipe' }">Hinzufügen</v-list-item>
    <v-list-item type="divider"></v-list-item>
    <v-divider></v-divider>
    <v-list-item type="subheader"><h4>Bücher</h4></v-list-item>
    <v-list-item :to="{ name: 'allBooks' }">Sammlung</v-list-item>
    <v-list-item :to="{ name: 'newBook' }">Hinzufügen</v-list-item>
    <v-list-item type="divider"></v-list-item>
    <v-divider></v-divider>
    <v-list-item :to="{ name: 'user' }">Benutzer</v-list-item>
  </v-list>
</template>

<script setup lang="ts"></script>

<style scoped>
h4 {
  color: rgb(43, 43, 43);
}
</style>
