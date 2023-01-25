<template>
  <!-- Vuetify wrapper is made here-->
  <div
    class="v-input v-input--horizontal v-input--density-default v-input--dirty v-text-field text-primary"
    data-v-b76a587c=""
  >
    <div class="v-input__control">
      <div
        class="v-field v-field--active v-field--appended v-field--dirty v-field--has-label v-field--variant-filled v-theme--myCustomTheme"
        role="textbox"
      >
        <div class="v-field__overlay"></div>
        <div class="v-field__loader">
          <div
            class="v-progress-linear v-theme--myCustomTheme"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            style="height: 0px; --v-progress-linear-height: 2px"
          >
            <div class="v-progress-linear__background" style="width: 100%"></div>
            <div class="v-progress-linear__indeterminate">
              <div class="v-progress-linear__indeterminate long"></div>
              <div class="v-progress-linear__indeterminate short"></div>
            </div>
          </div>
        </div>

        <div class="v-field__field v-field__field_date" data-no-activator="">
          <label
            class="v-label v-field-label v-field-label--floating"
            aria-hidden="true"
            style=""
            >{{ label }}</label
          ><label class="v-label v-field-label" for="input-28" style="">{{
            label
          }}</label>
          <div class="v-field__input" data-no-activator="">
            <Datepicker
              v-model="date_from_computed"
              :format="format_date_from"
              autoApply
              @cleared="clear_date_from"
            ></Datepicker>
          </div>
        </div>
        <div class="v-field__outline"></div>
      </div>
    </div>

    <div class="v-input__details">
      <div class="v-messages"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useDates } from "../composables/dates";

export default defineComponent({
  props: {
    label: String,
  },
  setup(props) {
    const {
      date_from,
      format_date_from,
      date_from_computed,
      clear_date_from,
    } = useDates();

    const label = ref(props.label);

    return { label, date_from, format_date_from, date_from_computed, clear_date_from };
  },
  components: {
    Datepicker,
  },
});
</script>
<style scoped>
.dp__theme_light {
  --dp-background-color: #075985;
  --dp-text-color: #075985;
  --dp-hover-color: #075985;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #075985;
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #075985;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: transparent;
  --dp-menu-border-color: transparent;
  --dp-border-color-hover: transparent;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #075985;
  --dp-highlight-color: transparent;
  --dp-text-color: #075985;
  --dp-background-color: transparent;
  --dp-border-color: transparent;
}

.v-field__input {
  display: block;
  padding-inline-end: 0;
  padding-inline-start: 3px;
}

.field__field_date {
  font-size: 1.7rem;
}

.v-field__field {
  padding-top: 5px;
}

.v-label {
  font-size: 0.9rem;
}

.v-field--active .v-label.v-field-label {
  font-size: 0.7rem;
}
</style>
