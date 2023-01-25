<template>
  <v-list>
    <v-list-item
      :prepend-avatar="defaultImagePathStatic"
      :title="name"
      :subtitle="email"
    ></v-list-item>
    <!-- referrerpolicy="no-referrer" -->
  </v-list>
</template>

<script setup lang="ts">
import { computed } from "vue";

const defaultImagePathStatic = "https://randomuser.me/api/portraits/men/11.jpg";

const name = "Jove";
const email = "jovetrajkoski@gmail.com";
</script>
