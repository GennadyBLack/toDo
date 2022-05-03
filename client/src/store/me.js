import { ref } from "vue";

export let user = ref(null);

export let setUser = (value) => {
  user.value = value;
};

export const logout = async () => {
  user.value = null;
  localStorage.setItem("token", null);
};
