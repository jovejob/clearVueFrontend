<template>
  <v-btn block variant="outlined" size="small" class="mb-1 py-0 px-2" @click="logout()">
    <v-icon left> mdi-logout-variant </v-icon>
    Logout
  </v-btn>
</template>

<script setup lang="ts">
const logout = () => {
  //  Logout api hit
};
</script>
