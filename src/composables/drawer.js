import { ref } from "vue";

const drawer = ref(null);

export const useDrawer = function () {
  // other functions, for example to mutate message ref

  return {
    drawer,
    // ...
  };
};
