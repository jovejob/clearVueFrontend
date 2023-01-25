<template>
  <v-app>
    <v-layout>
      <NavigationDrawer />

      <v-main>
        <LoggedInNav />

        <!-- Sizes your content based upon application components -->
        <MainContainer />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
import NavigationDrawer from "./components/NavigationDrawer.vue";
import LoggedInNav from "./components/LoggedInNav.vue";
import MainContainer from "@/components/MainContainer.vue";
//
</script>
