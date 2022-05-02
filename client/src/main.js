import App from "./App.vue";
import router from "./router";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

///old
// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// createApp(App).use(router).mount('#app')

import { createApp, h, provide } from "vue";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  from,
  HttpLink,
} from "@apollo/client/core";
import { ApolloClients } from "@vue/apollo-composable";


const additiveLink = from([
  new ApolloLink((operation, forward) => {


    operation.setContext(({ headers = {} }) => {
      const token = localStorage.getItem("token")
      console.log(token, "USERTOKEEN")
      return {
        headers: {
          ...headers,
          authorization: token != null ? `Bearer ${token}` : null,
        }
      }
    });
    return forward(operation); // Go to the next link in the chain. Similar to `next` in Express.js middleware.
  }),
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

export const apolloClient = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache(),
});

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient,
    });
  },
  render: () => h(App),
});

//new

app
  .use(Quasar, { ...quasarUserOptions })
  .use(router)
  .mount("#app");
