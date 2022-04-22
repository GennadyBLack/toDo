import { All_TODOS } from "@/graphql/documents";
import { useQuery } from "@vue/apollo-composable";

export default () => {
  let { result } = useQuery(All_TODOS);
  return result;
};
