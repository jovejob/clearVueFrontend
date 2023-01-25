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
        <v-btn color="primary" :to="{ name: 'meters.create' }" class="ma-4">
          <v-icon left>mdi-plus</v-icon>
          Add new item
        </v-btn>
      </div>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Serial Number</th>
            <th class="text-left">Installation Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!meters.length">
            <td>There are no items yet!</td>
          </tr>

          <tr v-for="item in meters" :key="item.name">
            <td>{{ item.id }}</td>

            <td class="text-primary truncate" @click="editItem(item.id)">
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <div class="mx-auto" v-bind="props">
                    {{ item.serial_number }}
                  </div>
                </template>
                <span>Click to edit the item {{ item.serial_number }}</span>
              </v-tooltip>
            </td>

            <td>{{ item.installation_date }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-container>
</template>

<script>
import { onMounted, ref, defineComponent } from "vue";
import { useNotification } from "@/composables/notification";
import { useRouter } from "vue-router";
import useMeters from "../../composables/meters";

export default defineComponent({
  setup() {
    let isLoading = ref(true);
    const { meters, getMeters } = useMeters();
    const props = ref([]);

    //vue router
    const router = useRouter();
    const { successNotification, successNotificationText, timeout } = useNotification();

    // mounted
    onMounted(() => {
      getAllMeters();
    });

    // TODO pagination is needed, this is too heavy :)
    async function getAllMeters() {
      try {
        return await getMeters().then((response) => {
          isLoading.value = response.data ?? false;
          successNotification.value = true;
          successNotificationText.value = "All items have been successfully retrieved!";
        });
      } catch (error) {
        isLoading.value = true;
      }
    }

    return {
      meters,
      isLoading,
      successNotification,
      successNotificationText,
      timeout,
      router,
      props,
    };
  },
  methods: {
    editItem: function (editItem) {
      this.router.push(`/meters/edit/${editItem}`);
    },
  },
});
</script>
