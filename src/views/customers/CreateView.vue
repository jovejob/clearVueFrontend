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
          <v-card-title class="text-center text-primary">Create Customer</v-card-title>
          <v-form class="mx-6">
            <v-text-field v-model="form.name" label="Name" class="text-primary" />

            <v-text-field
              v-model="form.email"
              label="Email"
              class="text-primary"
              type="email"
            />
            <v-text-field
              v-model="form.vat_number"
              label="VAT Number"
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
import useMeters from "../../composables/meters";
import useCustomers from "../../composables/customers";

export default defineComponent({
  setup() {
    const { createCustomer } = useCustomers();

    let isLoading = ref(true);
    const form = ref({
      name: "",
      email: "",
      vat_numbet: "",
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
      
    });

    async function handleCreate() {
      try {
        return await createCustomer({
          name: form.value["name"],
          email: form.value["email"],
          vat_number: form.value["vat_number"],
        }).then(async (response) => {
          isLoading.value = response.data ?? false;
          successNotification.value = true;
          successNotificationText.value = "Item added successfully!";
          await pushAsync({ name: "customers.index" });
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
      isLoading,
      successNotification,
      successNotificationText,
      errorNotification,
      errorNotificationText,
      timeout,
      router,
      form,
      handleCreate,
    };
  },
  methods: {},
  components: {},
});
</script>
