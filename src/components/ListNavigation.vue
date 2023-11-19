<template>
  <v-list>
    <v-list-item type="subheader" title="Rezepte"></v-list-item>
    <v-list-item title="Suche" :to="{ name: 'search' }"></v-list-item>
    <v-list-item>Listen</v-list-item>
    <v-list-item>Hinzufügen</v-list-item>
    <v-list-item type="divider"></v-list-item>
    <v-divider></v-divider>
    <v-list-item type="subheader" title="Bücher"></v-list-item>
    <v-list-item>Sammlung</v-list-item>
    <v-list-item>Hinzufügen</v-list-item>
    <v-list-item type="divider"></v-list-item>
    <v-divider></v-divider>
    <v-list-item>Benutzer</v-list-item>
  </v-list>
</template>

<script setup lang="ts"></script>
