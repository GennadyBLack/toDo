import { ref, computed } from "vue";
import { ME_QUERY } from "@/graphql/documents";
import { useQuery } from "@vue/apollo-composable";
export const profile = ref({});

export const setCurrentUser = async () => {
  console.log("setCurrentUser");
  let { result } = await useQuery(ME_QUERY);
  console.log(result, "result");
  profile.value = result;
};
export const logout = () => {
  profile.value = null;
  localStorage.setItem("token", null);
};

export const test = computed(() => profile?.value);
