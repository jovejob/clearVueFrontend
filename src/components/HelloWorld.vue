<template>
  <v-container>
    <v-btn class="mb-6" @click="handleUpdate" color="primary">Seed the DB</v-btn>
  </v-container>
</template>

<script lang="ts" setup>
import axios from "axios";

async function handleUpdate() {
  axios.defaults.baseURL = `${import.meta.env.VITE_BASE_CORE_API_URL}`;
  try {
    const response = await axios.get("/customers-fill");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
</script>
