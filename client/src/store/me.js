import { ref, computed } from "vue";
import { ME_QUERY } from "@/graphql/documents";
import { useQuery, provideApolloClient } from "@vue/apollo-composable";
export const profile = ref({});
export const log = ref(false);
import { apolloClient } from "../main";

export const setCurrentUser = async () => {
  console.log("setUser");
  provideApolloClient(apolloClient);

  //короче была проблема с нав гардом и setUser. Это из-за того, что код не ждал выполнения useQuery. Закинул его в промис и вроде заработало.
  await new Promise((resolve, reject) => {
    let { onResult, onError } = useQuery(ME_QUERY, null, {
      fetchPolicy: "no-cache",
    });
    onResult((result) => {
      profile.value = result?.data?.me;
      console.log("result");
      resolve(true);
    });
    onError((error) => {
      console.log("error");
      reject(error);
    });
  });
};

export const logout = () => {
  profile.value = null;
  log.value = false;
  localStorage.setItem("token", null);
};

export const isLoged = computed(() => !!profile?.value?.id);

export const test = computed(() => profile?.value?.value?.me?.id);
