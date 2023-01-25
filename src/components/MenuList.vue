<template>
  <v-list density="compact" nav>
    <div class="pa-2">
      <v-list-item>
        <v-list-item-title class="text-h6 text-primary"> ClearVue </v-list-item-title>
        <v-list-item-subtitle>
          <Version />
        </v-list-item-subtitle>
      </v-list-item>
    </div>

    <div class="pa-2 mt-4 overline">Pages</div>
    <v-list-item
      active-color="primary"
      prepend-icon="mdi-account-check"
      title="Profile"
      value="auth"
    >
    </v-list-item>

    <v-list-group value="Customers">
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          active-color="primary"
          prepend-icon="mdi-face-agent"
          title="Customers"
        ></v-list-item>
      </template>
      <v-list-item
        active-color="primary"
        prepend-icon="mdi-table"
        title="Table(all)"
        value="customers-all"
        to="/customers"
      ></v-list-item>
      <v-list-item
        active-color="primary"
        prepend-icon="mdi-plus-thick"
        title="Add new"
        value="customers"
        to="/customers/create"
      ></v-list-item>
    </v-list-group>

    <v-list-group value="Sites">
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          active-color="primary"
          prepend-icon="mdi-web"
          title="Sites"
        ></v-list-item>
      </template>
      <v-list-item
        active-color="primary"
        prepend-icon="mdi-table"
        title="Table(all)"
        value="sites-all"
        to="/sites"
      ></v-list-item>
      <v-list-item
        active-color="primary"
        prepend-icon="mdi-plus-thick"
        title="Add new"
        value="sites"
        to="/sites/create"
      ></v-list-item>
    </v-list-group>

    <v-list-group value="Meters">
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          active-color="primary"
          prepend-icon="mdi-meter-electric-outline"
          title="Meters"
        ></v-list-item>
      </template>
      <v-list-item
        active-color="primary"
        prepend-icon="mdi-table"
        title="Table(all)"
        value="meters-all"
        to="/meters"
      ></v-list-item>
      <v-list-item
        active-color="primary"
        prepend-icon="mdi-plus-thick"
        title="Add new"
        value="meters"
        to="/meters/create"
      ></v-list-item>
    </v-list-group>

    <v-list-group value="Circuits">
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          active-color="primary"
          prepend-icon="mdi-chip"
          title="Circuits"
        ></v-list-item>
      </template>
      <v-list-item
        active-color="primary"
        prepend-icon="mdi-table"
        title="Table(all)"
        value="circuits-all"
        to="/circuits"
      ></v-list-item>
      <v-list-item
        active-color="primary"
        prepend-icon="mdi-plus-thick"
        title="Add new"
        value="circuits"
        to="/circuits/create"
      ></v-list-item>
    </v-list-group>
  </v-list>
</template>

<script setup lang="ts">
import Version from "@/components/Version.vue";
</script>
