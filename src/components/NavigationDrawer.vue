<template>
  <v-navigation-drawer
    v-model="drawer"
    bg-primary
    :mini-variant.sync="drawer"
  >
    <DrawerAvatarImage />

    <MenuList />
    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          block

          class="mb-1 py-0 px-2 glow"
          color="primary"
        >
          <v-icon left> mdi-logout-variant </v-icon>
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DrawerAvatarImage from "./DrawerAvatarImage.vue";
import MenuList from "./MenuList.vue";
import { useDrawer } from "@/composables/drawer";

export default defineComponent({
  name: "NavigationDrawer",
  setup() {
    const { drawer } = useDrawer();

    return {
      drawer,
    };
  },

  components: {
    MenuList,
    DrawerAvatarImage,
  },
});
</script>
<style scoped>
.glow {
  /* box-shadow: 1px 1px 18px #075985; */
  box-shadow: 1px 1px 8px #334155;
}
</style>
