import { ref, computed } from "vue";
import { ME_QUERY } from "@/graphql/documents";
import {
  useQuery,
  provideApolloClient,
  useResult,
} from "@vue/apollo-composable";
export let profile = ref(null);
export const log = ref(false);
import { apolloClient } from "../main";

export const setCurrentUser = async () => {
  provideApolloClient(apolloClient);
  let { result } = useQuery(ME_QUERY);
  let pre = useResult(result, null, (data) => data.me);
  profile = pre;
};

export const logout = () => {
  profile.value = null;
  log.value = false;
  localStorage.setItem("token", null);
};

export const isLoged = computed(() => profile.value.value.id);

export const test = computed(() => profile?.value?.value?.me?.id);
