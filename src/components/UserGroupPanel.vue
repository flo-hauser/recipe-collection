<template>
  <v-fade-transition>
    <div v-if="userGroup" class="text-left">
      <v-row>
        <v-col>
          <h4>{{ userGroup.group_name }}</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-list lines="one">
            <v-list-item
              v-for="user in userGroup.users"
              :key="user.id"
              :title="user.username"
              :subtitle="user.id == userGroup.group_admin.id ? 'Admin' : ''"
              :prepend-avatar="user._links.avatar"
            >
              <template
                v-slot:append
                v-if="user.id != userGroup.group_admin.id && userIsAdmin"
              >
                <v-btn
                  @click.stop="removeUser(user)"
                  color="grey-lighten-1"
                  icon="mdi-delete"
                  variant="text"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row justify="end" align="end" style="min-height: 150px" class="mb-4">
        <v-col class="d-flex align-start">
          <v-btn @click.stop="leaveGroup" block>Austreten</v-btn>
          <v-spacer></v-spacer>
        </v-col>
        <v-col class="d-flex align-end">
          <v-spacer></v-spacer>
          <v-btn @click.stop="showInviteMember" block :disabled="!userIsAdmin"
            >Einladen</v-btn
          >
        </v-col>
      </v-row>
      <v-fade-transition>
        <v-form
          @submit.prevent="sendInvite"
          v-if="showInvite"
          v-model="inviteForm"
        >
          <v-text-field
            :rules="[required, isEmail]"
            v-model="inviteEmail"
            class="mb-2"
            label="Email"
            name="email"
            type="email"
            autocomplete="off"
          ></v-text-field>
          <v-btn
            :loading="loading"
            :disabled="!inviteForm"
            block
            size="large"
            type="submit"
            variant="elevated"
          >
            Absenden
          </v-btn>
        </v-form>
      </v-fade-transition>
    </div>
    <div v-else class="mb-4">
      <p class="text-left">Du bist noch keiner Gruppe zugeordnet.</p>
      <p class="text-left mb-6">
        Erstelle eine neue Gruppe und lade Mitglieder ein:
      </p>

      <v-form @submit.prevent="createGroup" v-model="form">
        <v-text-field
          v-model="newUserGroupName"
          :rules="[required]"
          class="mb-2"
          label="Neuer Gruppenname"
          name="newUserGroupName"
        ></v-text-field>
        <v-btn
          :loading="loading"
          :disabled="!form"
          block
          size="large"
          type="submit"
          variant="elevated"
        >
          Gruppe erstellen
        </v-btn>
      </v-form>
    </div>
  </v-fade-transition>
</template>

<script setup lang="ts">
import { User } from "@/types/dto/User";
import { required, isEmail } from "@/validation/rules";
import { useRecipeApi } from "@/composables/api";
import { useMessageStore } from "@/store/messages";
import { UserGroup } from "@/types/dto/UserGroup";
import { ref, watch, onMounted, computed } from "vue";
import { useModalStore } from "@/store/modal";

const props = defineProps({
  user: {
    type: Object as () => User | null,
    required: true,
  },
});

const emit = defineEmits(["create:group"]);
const modal = useModalStore();

const form = ref(false);
const loading = ref(false);
const newUserGroupName = ref("");
const userGroup = ref<UserGroup | null>(null);
const userIsAdmin = computed(() => {
  if (props.user && userGroup.value?.id) {
    return props.user.id == userGroup.value.group_admin.id;
  }
  return false;
});

// fetch user group on user change
watch(
  () => props.user,
  () => {
    fetchGroup();
  }
);

onMounted(() => {
  fetchGroup();
});

const createGroup = () => {
  useRecipeApi<UserGroup>("user_groups", "POST", {
    group_name: newUserGroupName.value,
  })
    .then((response) => {
      emit("create:group", response);
      newUserGroupName.value = "";
    })
    .catch((error) => {
      console.error(error);
    });
};

const leaveGroup = () => {
  if (!props.user?._links.user_group) {
    return;
  }
  const groupLink = props.user._links.user_group;
  modal.showDialog(
    "Möchtest du wirklich die Gruppe verlassen?",
    "warning",
    () => {
      useRecipeApi<UserGroup>(groupLink, "DELETE")
        .then((response) => {
          userGroup.value = null;
          emit("create:group", response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  );
};

const fetchGroup = () => {
  if (!props.user?._links.user_group) {
    return;
  }
  useRecipeApi<UserGroup>(props.user._links.user_group, "GET")
    .then((response) => {
      userGroup.value = response;
    })
    .catch((error) => {
      console.error(error);
    });
};

const showInvite = ref(false);
const inviteForm = ref(false);
const inviteEmail = ref("");
const showInviteMember = () => {
  showInvite.value = !showInvite.value;
  inviteEmail.value = "";
};
const sendInvite = () => {
  loading.value = true;
  useRecipeApi<UserGroup>(
    `${userGroup.value?._links.self}/users/email`,
    "PUT",
    {
      email: inviteEmail.value,
    }
  )
    .then(() => {
      loading.value = false;
      showInvite.value = false;
      inviteForm.value = false;
      inviteEmail.value = "";
      fetchGroup();
      useMessageStore().showMessage("Einladung wurde gesendet", "success");
    })
    .catch((error) => {
      console.error(error);
      loading.value = false;
      useMessageStore().showMessage("Einladung fehlgeschlagen", "error");
    });
};

const removeUser = (user: User) => {
  loading.value = true;
  useRecipeApi<UserGroup>(
    `${userGroup.value?._links.self}/users/${user.id}`,
    "DELETE"
  )
    .then(() => {
      loading.value = false;
      fetchGroup();
    })
    .catch((error) => {
      console.error(error);
      loading.value = false;
    });
};
</script>
