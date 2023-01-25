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
        <v-btn color="primary" :to="{ name: 'customers.create' }" class="ma-4">
          <v-icon left>mdi-plus</v-icon>
          Add new item
        </v-btn>
      </div>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">VAT number</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!customers.length">
            <td>There are no items yet!</td>
          </tr>

          <tr v-for="item in customers" :key="item.name">
            <td>{{ item.id }}</td>

            <td class="text-primary truncate" @click="editItem(item.id)">
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <div class="mx-auto" v-bind="props">
                    {{ item.name }}
                  </div>
                </template>
                <span>Click to edit the item</span>
              </v-tooltip>
            </td>

            <td class="text-primary">
              {{ item.email }}
            </td>

            <td class="text-primary">
              {{ item.vat_number }}
            </td>

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
import { defineComponent, onMounted, ref } from "vue";
import { useNotification } from "@/composables/notification";
import { useRouter } from "vue-router";
import useCustomers from "../../composables/customers";

export default defineComponent({
  setup() {
    const { customers, getCustomers, deleteCustomer } = useCustomers();
    const isLoading = ref(true);

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
      getAllCustomers();
    });

    async function getAllCustomers() {
      try {
        isLoading.value = true;
        await getCustomers();
        isLoading.value = false;
      } catch (error) {
        successNotification.value = false;
        successNotificationText.value =
          "An error occurred while retrieving the customers";
      }
    }

    async function deleteEntity(id: number) {
      try {
        return await deleteCustomer(id).then(async (response) => {
          isLoading.value = response.data ?? false;
          successNotification.value = true;
          successNotificationText.value = "Item deleted successfully!";
          const index = customers.value.findIndex((customer) => customer.id === id);
          customers.value.splice(index, 1);
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
      customers,
      isLoading,
      successNotification,
      successNotificationText,
      errorNotification,
      errorNotificationText,
      timeout,
      router,
      deleteEntity,
    };
  },
  methods: {
    editItem: function (editItem: number) {
      this.router.push(`/customers/edit/${editItem}`);
    },
  },
});
</script>
