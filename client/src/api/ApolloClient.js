import ApolloClient from "apollo-boost";

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: process.env.BASE_URL,
});
