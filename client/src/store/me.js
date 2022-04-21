import { ref, computed } from "vue";
import { ME_QUERY } from "@/graphql/documents";
import { useQuery } from "@vue/apollo-composable";
export const profile = ref({});

export const setCurrentUser = () => {
  let { result } = useQuery(ME_QUERY);
  profile.value = result;
};

export const test = computed(() => profile?.value);
