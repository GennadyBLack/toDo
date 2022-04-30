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
  let pre = useResult(result, null, (data) => data.me);
  profile.value = pre;
};
export const logout = () => {
  profile.value = null;
  localStorage.setItem("token", null);
};

export const isLoged = computed(() => !!profile?.value?.value?.me?.id);

export const test = computed(() => profile?.value?.value?.me?.id);
