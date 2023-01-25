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

    <v-btn class="mb-6" color="primary" :to="{ name: 'circuits.index' }">
      <v-icon>mdi-arrow-left</v-icon>Back to circuits
    </v-btn>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-center text-primary"
            >Edit Circuit/Sub Circuit</v-card-title
          >
          <v-form class="mx-6">
            <v-text-field v-model="form.name" label="Name" class="text-primary" />

            <DateFrom :label="`Installation date`" />

            <v-autocomplete
              label="Meter"
              class="text-primary"
              outlined
              no-data-text="Loading Items..."
              clearable
              v-model="form.meter"
              :items="metersOptions"
              small-chips
              persistent-hint
              return-object
              item-title="serial_number"
              item-value="id"
            ></v-autocomplete>

            <v-autocomplete
              label="Parent Circuit"
              class="text-primary"
              outlined
              no-data-text="Loading Items..."
              clearable
              v-model="form.circuit_id"
              :items="circuitsOptions"
              small-chips
              persistent-hint
            ></v-autocomplete>

            <v-autocomplete
              disabled
              label="Sub Circuits"
              class="text-primary"
              outlined
              no-data-text="Loading Items..."
              clearable
              v-model="form.subCircuits"
              small-chips
              persistent-hint
              return-object
              item-title="name"
              item-value="id"
              chips
              hint="You can edit their parents directly!"
            ></v-autocomplete>

            <v-checkbox
              v-model="form.is_main"
              label="Is Main Circuit"
              class="text-primary"
            />
            <v-btn class="mb-6" @click="handleUpdate" color="primary">Create</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNotification } from "@/composables/notification";
import { useDates } from "../../composables/dates";
import DateFrom from "../../components/DateFrom.vue";
import useMeters from "../../composables/meters";
import useCircuits from "../../composables/circuits";

export default defineComponent({
  setup() {
    const {
      circuits,
      getCircuits,
      createCircuit,
      getCircuit,
      circuit,
      updateCircuit,
    } = useCircuits();
    const { date_from } = useDates();
    const { meters, getMeters } = useMeters();
    const metersOptions = ref([]);
    const circuitsOptions = ref([]);

    let isLoading = ref(true);
    const form = ref({
      name: "",
      installation_date: "",
      meterId: "",
      circuit_id: "",
      is_main: false,
    });

    //vue router
    const router = useRouter();
    const route = useRoute();

    const {
      successNotification,
      successNotificationText,
      timeout,
      errorNotification,
      errorNotificationText,
    } = useNotification();

    // mounted
    onMounted(async () => {
      await getCircuit(`${route.params.id}`).then((circuitData) => {
        form.value = circuit.value;
        date_from.value = formatDate(form.value["installation_date"]);
      });

      await getMeters().then((metersArrayData) => {
        metersOptions.value = dropdownMetersFormat(metersArrayData);
      });

      await getCircuits().then((circuitsArrayData) => {
        circuitsOptions.value = dropdownCircuitsFormat(circuitsArrayData);
      });
    });

    function formatDate(timestamp) {
      if (!timestamp) return ["-"];

      const date = timestamp.split("T");
      const removeChars = date[1].split(".");
      date[1] = removeChars[0];
      return date[0];
    }

    function dropdownCircuitsFormat(formatArray) {
      return formatArray.map(({ id, name }) => ({
        value: id,
        title: name,
        id: id,
        name: name,
      }));
    }

    function dropdownMetersFormat(formatArray) {
      return formatArray.map(({ id, serial_number }) => ({
        value: id,
        title: serial_number,
        id: id,
        serial_number: serial_number,
      }));
    }

    async function handleUpdate() {
      try {
        const requestData = {
          name: form.value["name"],
          installation_date: date_from.value,
          circuit_id: Number.isNaN(form.value["circuit_id"])
            ? ""
            : form.value["circuit_id"],
          meter_id: parseInt(circuit.value["meter"].id),

          is_main: circuit.value["is_main"],
        };

        console.log("requestData", requestData);

        return await updateCircuit(circuit.value.id, requestData).then(
          async (response) => {
            isLoading.value = response.data ?? false;
            successNotification.value = true;
            successNotificationText.value = "Item updated successfully!";
            await pushAsync({ name: "circuits.index" });
          }
        );
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
      circuit,
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
      handleUpdate,
      date_from,
    };
  },
  methods: {},
  components: {
    DateFrom,
  },
});
</script>
