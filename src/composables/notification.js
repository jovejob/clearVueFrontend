import { ref } from "vue";

const successNotification = ref(false);
const errorNotification = ref(false);
const successNotificationText = ref("Item added successfully!");
const errorNotificationText = ref(
  "Ooops, something has gone wrong! Please try again!"
);
const timeout = ref(2000);

export const useNotification = function () {
  // other functions, for example to mutate message ref

  return {
    successNotification,
    successNotificationText,
    errorNotification,
    errorNotificationText,
    timeout,
    // ...
  };
};
