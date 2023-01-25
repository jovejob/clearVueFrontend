<template>
  <v-container fluid>
    <!-- TODO extract its own component -->
    <div class="notification">
      <v-snackbar
        v-model="successNotification"
        :timeout="timeout"
        color="green"
        right
        top
      >
        <v-icon> mdi-checkbox-marked-circle-outline </v-icon>
        {{ successNotificationText }}

        <template v-slot:actions>
          <v-btn text @click="successNotification = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </template>
      </v-snackbar>

      <v-snackbar v-model="errorNotification" :timeout="timeout" color="red" top right>
        <v-icon> mdi-close-circle </v-icon>
        {{ errorNotificationText }}

        <template v-slot:actions>
          <v-btn text @click="errorNotification = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>

    <div v-if="isLoading">
      <v-row align-content="center" justify="center">
        <v-col class="text-subtitle-1 text-center" cols="12"> Loading data </v-col>
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

    <div v-if="!isLoading">
      <div>
        <v-btn color="primary" :to="{ name: 'circuits.create' }" class="ma-4">
          <v-icon left>mdi-plus</v-icon>
          Add new item
        </v-btn>
      </div>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Name</th>
            <th class="text-left">Sub Circuits</th>
            <th class="text-left">Meter(serial number)</th>
            <th class="text-left">Site ID</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!circuits.length">
            <td>There are no items yet!</td>
          </tr>

          <!-- <tr v-for="item in circuits" :key="item.name"> -->
          <tr v-for="(item, index) in circuits" :key="item.id">
            <td>{{ item.id }}</td>

            <td class="text-primary" @click="editItem(item.id)">
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <div class="mx-auto" v-bind="props">
                    {{ item.name }}
                  </div>
                </template>
                <span>Click to edit the item: {{ item.name }}</span>
              </v-tooltip>
            </td>

            <td class="text-primary" width="20%">
              <!-- <div> -->
              <div class="d-flex flex-row align-center justify-space-between">
                <v-badge
                  color="green"
                  :content="item.subCircuits.length"
                  location="top"
                  inline
                ></v-badge>
                <div
                  class="d-flex flex-column justify-start"
                  v-for="subCircuit in item.subCircuits"
                  :key="subCircuit.name"
                  @click="editItem(subCircuit.id)"
                >
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <div class="mx-auto" v-bind="props">
                        {{ subCircuit.name }}
                      </div>
                    </template>
                    <span>Click to edit the item: {{ subCircuit.name }}</span>
                  </v-tooltip>
                </div>
              </div>
            </td>

            <td>{{ item.meter ? item.meter.serial_number : " - " }}</td>

            <td>{{ item.meter ? item.meter.site_id : " - " }}</td>

            <td>
              <div class="d-flex flex-row">
                <v-btn variant="outlined" color="blue" @click="editItem(item.id)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  variant="outlined"
                  class="ml-6"
                  color="red"
                  @click="deleteEntity(item.id)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-container>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from "vue";
import { useNotification } from "@/composables/notification";
import { useRouter } from "vue-router";
import useCircuits from "../../composables/circuits";

export default defineComponent({
  setup() {
    let isLoading = ref(true);
    const { circuits, getCircuits, deleteCircuit } = useCircuits();
    const props = ref([]);

    //vue router
    const router = useRouter();
    const {
      successNotification,
      successNotificationText,
      timeout,
      errorNotification,
      errorNotificationText,
    } = useNotification();

    // mounted
    onMounted(() => {
      getAllCircuits();
    });

    // TODO pagination is needed, this is too heavy :)
    async function getAllCircuits() {
      try {
        return await getCircuits().then((response) => {
          isLoading.value = response.data ?? false;
        });
      } catch (error) {
        isLoading.value = true;
        errorNotification.value = true;
      }
    }

    async function deleteEntity(id: number) {
      try {
        return await deleteCircuit(id).then(async (response) => {
          isLoading.value = response.data ?? false;
          successNotification.value = true;
          successNotificationText.value = "Item deleted successfully!";
          const index = circuits.value.findIndex((circuit) => circuit.id === id);
          circuits.value.splice(index, 1);
        });
      } catch (error) {
        errorNotification.value = true;
        showErrors(error.response.data.errors);
        isLoading.value = true;
      }
    }

    async function showErrors(errors: { field: string; message: string }[]) {
      errorNotificationText.value = "";
      errors.forEach((error: { field: string; message: string }) => {
        errorNotificationText.value += `${error.field}: ${error.message}` + "\n";
      });
    }

    return {
      circuits,
      isLoading,
      successNotification,
      successNotificationText,
      errorNotification,
      errorNotificationText,
      timeout,
      router,
      props,
      deleteEntity,
    };
  },
  methods: {
    editItem: function (editItem) {
      this.router.push(`/circuits/edit/${editItem}`);
    },
  },
});
</script>
