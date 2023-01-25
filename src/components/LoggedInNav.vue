<template>
  <div>
    <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      id="toolbar"
      color="primary"
    >
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="pa-1">ClearVue</v-toolbar-title>

      <v-spacer></v-spacer>

      <NotificationBadge />

      <v-menu location="start" transition="scale-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <AvatarImage />
          </v-btn>
        </template>

        <v-card color="primary" class="mx-n12 my-12">
          <v-card-text class="p-0">
            <div class="px-2 py-2 text-center text-text">
              <Name />
              <Email />

              <v-divider class="my-3" color="primary"></v-divider>

              <div class="d-flex align-start flex-column">
                <v-btn variant="text" size="small" class="mb-1 py-0 px-2">
                  <v-icon left> mdi-account-box-outline </v-icon>
                  Profile
                </v-btn>

                <v-btn
                  variant="text"
                  size="small"
                  class="mb-1 py-0 px-2"
                  @click="toggleDrawer"
                >
                  <v-icon left> mdi-developer-board </v-icon>
                  Board
                </v-btn>
                <v-divider class="my-3" color="white"></v-divider>

                <LogoutButton />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import NotificationBadge from "./NotificationBadge.vue";
import AvatarImage from "./AvatarImage.vue";
import Email from "./Email.vue";
import Name from "./Name.vue";
import LogoutButton from "./LogoutButton.vue";
import { useDrawer } from "@/composables/drawer";

export default defineComponent({
  name: "LoggedInNav",
  setup() {
    const { drawer } = useDrawer();

    const props = ref([]);
    function toggleDrawer() {
      return (drawer.value = !drawer.value);
    }

    return {
      toggleDrawer,
      props,
    };
  },

  components: {
    NotificationBadge,
    AvatarImage,
    Email,
    Name,
    LogoutButton,
  },
});
</script>
