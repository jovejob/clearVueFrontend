
import { ref, computed } from "vue";

const date_from = ref("");
const date_to = ref("");

const date_from_computed = computed({
  // getter
  get() {
    return date_from.value;
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    if (newValue) {
      date_from.value = format_date_from(newValue);
    }
  },
});

const date_to_computed = computed({
  // getter
  get() {
    return date_to.value;
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    if (newValue) {
      date_to.value = format_date_to(newValue);
    }
  },
});

const format_date_to = (date_to) => {
  const day = String(date_to.getDate()).padStart(2, "0");
  const month = String(date_to.getMonth() + 1).padStart(2, "0");
  const year = date_to.getFullYear();

  return `${year}-${month}-${day}`;
};

const format_date_from = (date_from) => {
  const day = String(date_from.getDate()).padStart(2, "0");
  const month = String(date_from.getMonth() + 1).padStart(2, "0");
  const year = date_from.getFullYear();

  return `${year}-${month}-${day}`;
};

const clear_date_from = () => {
  date_from.value = "";
};

const clear_date_to = () => {
  date_to.value = "";
};

export const useDates = function () {
  // other functions, for example to mutate message ref

  return {
    date_from,
    date_to,
    date_from_computed,
    date_to_computed,
    format_date_from,
    format_date_to,
    clear_date_from,
    clear_date_to
    // ...
  };
};
