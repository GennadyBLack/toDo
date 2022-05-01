import { ref, computed } from "vue";
import { ME_QUERY } from "@/graphql/documents";
import {
  useQuery,
  provideApolloClient,
  useResult,
} from "@vue/apollo-composable";
export const profile = ref({});
import { apolloClient } from "../main";

export const setCurrentUser = async () => {
  profile.value = null;
  await provideApolloClient(apolloClient);
  let { result } = await useQuery(ME_QUERY);
  return useResult(result, null, (data) => data.me);
};
export const logout = () => {
  profile.value = null;
  localStorage.setItem("token", null);
};

export const isLoged = computed(() => localStorage.getItem("token") != "null");

export const userToken = computed({
  get() {
    return localStorage.getItem("token");
  },
  set(newValue) {
    localStorage.setItem("token", newValue);
  },
});

export const test = computed(() => profile?.value?.value?.me?.id);
