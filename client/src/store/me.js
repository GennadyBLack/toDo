import { ref, computed } from "vue";
import { ME_QUERY } from "@/graphql/documents";
import { useQuery, provideApolloClient } from "@vue/apollo-composable";
export const profile = ref({});
export const log = ref(false);
import { apolloClient } from "../main";

export const setCurrentUser = async () => {
  provideApolloClient(apolloClient);
  let { result } = await useQuery(ME_QUERY);
  profile.value = result.value;
  console.log(profile?.value?.me, "profile");
};

export const logout = () => {
  profile.value = null;
  log.value = false;
  localStorage.setItem("token", null);
};

export const isLoged = computed(() => profile?.value?.me?.id);

export const test = computed(() => profile?.value?.value?.me?.id);
