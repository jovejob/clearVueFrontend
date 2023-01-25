<template>
  <v-container>
    <!-- Extract Notification component -->
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

    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-center text-primary">Create Circuit</v-card-title>
          <v-form class="mx-6">
            <v-text-field v-model="form.name" label="Name" class="text-primary" />

            <DateFrom :label="`Date from`" />

            <v-autocomplete
              label="Meter"
              class="text-primary"
              outlined
              no-data-text="Loading Items..."
              clearable
              v-model="form.meterId"
              :items="metersOptions"
              small-chips
              persistent-hint
            ></v-autocomplete>

            <v-autocomplete
              label="Parent Circuit"
              class="text-primary"
              outlined
              no-data-text="Loading Items..."
              clearable
              v-model="form.circuitId"
              :items="circuitsOptions"
              small-chips
              persistent-hint
            ></v-autocomplete>

            <v-checkbox
              v-model="form.is_main"
              label="Is Main Circuit"
              class="text-primary"
            />
            <v-btn class="mb-6" @click="handleCreate" color="primary">Create</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useNotification } from "@/composables/notification";
import { useDates } from "../../composables/dates";
import DateFrom from "../../components/DateFrom.vue";
import useMeters from "../../composables/meters";
import useCircuits from "../../composables/circuits";

export default defineComponent({
  setup() {
    const { circuits, getCircuits, createCircuit } = useCircuits();
    const { date_from } = useDates();
    const { meters, getMeters } = useMeters();
    const metersOptions = ref([]);
    const circuitsOptions = ref([]);

    let isLoading = ref(true);

    //TODO move state from the component
    const form = ref({
      name: "",
      installation_date: "",
      meterId: "",
      circuitId: "",
      is_main: false,
    });

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
    onMounted(async () => {
      await getMeters().then((metersArrayData) => {
        metersOptions.value = dropdownMetersFormat(metersArrayData);
      });
      await getCircuits().then((circuitsArrayData) => {
        circuitsOptions.value = dropdownCircuitsFormat(circuitsArrayData);
      });
    });

    function dropdownCircuitsFormat(formatArray) {
      return formatArray.map(({ id, name }) => ({
        value: id,
        title: name,
        id: id,
      }));
    }

    function dropdownMetersFormat(formatArray) {
      return formatArray.map(({ id, serial_number }) => ({
        value: id,
        title: serial_number,
        id: id,
      }));
    }

    async function handleCreate() {
      try {
        return await createCircuit({
          name: form.value["name"],
          installation_date: date_from.value,
          meter_id: parseInt(form.value["meterId"]),
          circuit_id: parseInt(form.value["circuitId"]),
          is_main: form.value["is_main"],
        }).then(async (response) => {
          isLoading.value = response.data ?? false;
          successNotification.value = true;
          successNotificationText.value = "Item added successfully!";
          await pushAsync({ name: "circuits.index" });
        });
      } catch (error) {
        errorNotification.value = true;
        showErrors(error.response.data.errors);
        isLoading.value = true;
      }
    }

    /**
     * Async push method
     */
    async function pushAsync(route: object) {
      return new Promise(() => {
        router.push(route);
      });
    }

    async function showErrors(errors: { field: string; message: string }[]) {
      errorNotificationText.value = "";
      errors.forEach((error: { field: string; message: string }) => {
        errorNotificationText.value += `${error.field}: ${error.message}` + "\n";
      });
    }

    return {
      circuits,
      createCircuit,
      meters,
      isLoading,
      successNotification,
      successNotificationText,
      errorNotification,
      errorNotificationText,
      timeout,
      router,
      form,
      metersOptions,
      circuitsOptions,
      handleCreate,
      date_from,
    };
  },
  methods: {},
  components: {
    DateFrom,
  },
});
</script>
