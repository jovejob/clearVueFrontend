<template>
  <v-container fluid>
    <div v-if="isLoading">
      <v-row fluid fill-height align-content="center" justify="center">
        <v-col class="text-subtitle-1 text-center text-primary" cols="12">
          Loading data
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="primary"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </div>

    <div v-if="!isLoading" class="d-flex align-center justify-center">
      <div color="primary" class="date">
        <div class="text-primary" color="primary">
          <v-icon left>mdi-calendar-range </v-icon>
          {{ dashboardTitle }}
        </div>
      </div>
    </div>



  </v-container>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent, computed } from "vue";

// import { useDisplay } from "vuetify";

export default defineComponent({
  setup() {
    const campaignsOptions = ref([]);


    const isLoading = ref(true);
    let dashboardTitle = ref("");

    // const { name } = useDisplay();

    onMounted(async () => {
      try {
        isLoading.value = false;
      } catch (error) {
        isLoading.value = true;
      }
    });


    return {
      isLoading,
      dashboardTitle,
    };
  },
  methods: {},
  components: {
  },
});
</script>
