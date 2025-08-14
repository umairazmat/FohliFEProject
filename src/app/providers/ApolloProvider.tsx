import type { ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "/graphql" }),
  cache: new InMemoryCache({
    typePolicies: {
      User: { keyFields: ["id"] },
      Query: {
        fields: {
          users: { merge: (_ex, incoming) => incoming },
        },
      },
    },
  }),
});

export function ApolloAppProvider({ children }: { children: ReactNode }) {
  return <Provider client={client}>{children}</Provider>;
}
