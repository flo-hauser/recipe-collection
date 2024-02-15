<template>
  <CenteredContainer>
    <v-sheet
      class="px-6 pt-6 mx-auto pb-6"
      rounded
      max-width="650px"
      color="lightSurface"
      min-height="600px"
    >
      <h2>Mein Account</h2>

      <v-tabs v-model="tab" class="mb-6" grow>
        <v-tab value="profile">Profil</v-tab>
        <v-tab value="password">Passwort</v-tab>
        <v-tab value="group">Gruppe</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="profile" class="align-left">
          <v-row>
            <v-col><h4>Benutzerdaten</h4></v-col>
          </v-row>
          <v-row>
            <v-col cols="4">Name</v-col>
            <v-col>{{ user?.username }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">E-Mail</v-col>
            <v-col>{{ user?.email }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">Registriert seit</v-col>
            <v-col>{{ "user?.created_at" }}</v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="password">
          <UpdatePassword @update:password="updatedPassword"></UpdatePassword>
        </v-window-item>

        <v-window-item value="group">
          <UserGroupPanel
            :user="user"
            @create:group="refreshUser"
          ></UserGroupPanel>
        </v-window-item>
      </v-window>
    </v-sheet>
  </CenteredContainer>
</template>

<script setup lang="ts">
import CenteredContainer from "@/components/CenteredContainer.vue";
import UpdatePassword from "@/components/UpdatePassword.vue";
import UserGroupPanel from "@/components/UserGroupPanel.vue";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { user } = storeToRefs(useAuthStore());

const tab = ref(null) as any;

const updatedPassword = () => {
  setTimeout(() => {
    tab.value = "profile";
  }, 750);
};

const refreshUser = async () => {
  await useAuthStore().fetchSelf();
};
</script>

<style scoped>
h2 {
  margin-bottom: 1.5rem;
}

.align-left {
  text-align: left;
}
</style>
