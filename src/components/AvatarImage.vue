<template>
  <v-badge v-bind:icon="avatarBadge" color="yellow">
    <v-avatar>
      <v-img
        v-bind:src="defaultImagePathStatic"
        alt="ProfileImage.jpg"
        referrerpolicy="no-referrer"
      ></v-img>
    </v-avatar>
  </v-badge>
</template>

<script setup lang="ts">
const defaultImagePathStatic = "https://randomuser.me/api/portraits/men/11.jpg";

const avatarBadge = "mdi-account-tie";
</script>

<style scoped></style>
