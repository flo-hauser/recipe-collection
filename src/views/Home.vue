<template>
  <v-fade-transition>
    <v-container class="logo-container" :class="hiddenClass">
      <v-img @click="pushToSearch" src="@/assets/logo.png" cover
        ><h1>Rezepteverzeichnis</h1></v-img
      >
    </v-container>
  </v-fade-transition>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";

const hidden = ref(false);
const hiddenClass = computed(() => {
  return hidden.value ? "hidden" : "";
});

const emits = defineEmits(["pushToSearch"]);

const pushToSearch = () => {
  emits("pushToSearch");
  hidden.value = true;
  router.push({ name: "search" });
};

const router = useRouter();
onMounted(() => {
  const firstCall = router.options.history.state.back == null;
  if (firstCall) {
    setTimeout(() => {
      pushToSearch();
    }, 2000);
  }
});
</script>

<style scoped>
.logo-container {
  height: 90vh;
  width: 70vw;
  margin: auto;
}

h1 {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(250, 133, 0);
  font-size: 3rem;
}

.hidden {
  transform: translate(-30%, -100%) scale(0.1);
  opacity: 0;
  transition: all 0.7s ease-in;
}

@media screen and (max-width: 1900px) {
  h1 {
    display: none;
  }
}
</style>
