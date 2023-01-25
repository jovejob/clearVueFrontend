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
        <v-btn color="primary" :to="{ name: 'sites.create' }" class="ma-4">
          <v-icon left>mdi-plus</v-icon>
          Add new item
        </v-btn>
      </div>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Name</th>
            <th class="text-left">Address</th>
            <th class="text-left">Post code</th>
            <th class="text-left">Coordinates</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!sites.length">
            <td>There are no items yet!</td>
          </tr>

          <tr v-for="item in sites" :key="item.name">
            <td>{{ item.id }}</td>

            <td v-bind="props" @click="editItem(item.id)" class="text-primary">
              <v-icon v-bind="props">mdi-square-edit-outline</v-icon>
              {{ item.name }}
            </td>

            <td>{{ item.address }}</td>

            <td>{{ item.post_code }}</td>
            <td>{{ item.coordinates }}</td>
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
import useSites from "../../composables/sites";

export default defineComponent({
  setup() {
    let isLoading = ref(true);
    const { sites, getSites } = useSites();
    const props = ref([]);

    //vue router
    const router = useRouter();
    const { successNotification, successNotificationText, timeout } = useNotification();

    // mounted
    onMounted(() => {
      getAllSites();
    });

    // TODO pagination is needed, this is too heavy :)
    async function getAllSites() {
      try {
        return await getSites().then((response) => {
          isLoading.value = response.data ?? false;
          successNotification.value = true;
          successNotificationText.value = "All items have been successfully retrieved!";
        });
      } catch (error) {
        isLoading.value = true;
      }
    }

    return {
      sites,
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
      this.router.push(`/sites/edit/${editItem}`);
    },
  },
});
</script>
