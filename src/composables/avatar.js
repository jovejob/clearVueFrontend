import { ref } from "vue";

const avatarBadge = ref("mdi-account-tie");
const avatarSuperAdminIcon = ref("mdi-shield-star-outline");
const avatarAdminIcon = ref("mdi-account-tie");

export const useAvatar = function () {
  // other functions, for example to mutate message ref

  return {
    avatarSuperAdminIcon,
    avatarAdminIcon,
    avatarBadge,
    // ...
  };
};
