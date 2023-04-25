import React, {useEffect, useState} from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import {NetworkName} from "../../constants";
import {useGlobalState} from "../../GlobalState";

function getIsGraphqlClientSupportedFor(networkName: NetworkName): boolean {
  const graphqlUri = getGraphqlURI(networkName);
  return typeof graphqlUri === "string" && graphqlUri.length > 0;
}

function getGraphqlURI(networkName: NetworkName): string | undefined {
  switch (networkName) {
    case "devnet":
      return process.env.REACT_APP_INDEXER_GRAPHQL_DEVNET;
    default:
      return undefined;
  }
}

function getGraphqlClient(
  networkName: NetworkName,
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    link: new HttpLink({
      uri: getGraphqlURI(networkName),
    }),
    cache: new InMemoryCache(),
  });
}

export function useGetGraphqlClient() {
  const [state, _] = useGlobalState();
  const [graphqlClient, setGraphqlClient] = useState<
    ApolloClient<NormalizedCacheObject>
  >(getGraphqlClient(state.network_name));

  useEffect(() => {
    setGraphqlClient(getGraphqlClient(state.network_name));
  }, [state.network_name]);

  return graphqlClient;
}

type GraphqlClientProviderProps = {
  children: React.ReactNode;
};

export function GraphqlClientProvider({children}: GraphqlClientProviderProps) {
  const graphqlClient = useGetGraphqlClient();

  return <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>;
}

export function useGetIsGraphqlClientSupported(): boolean {
  const [state, _] = useGlobalState();
  const [isGraphqlClientSupported, setIsGraphqlClientSupported] =
    useState<boolean>(getIsGraphqlClientSupportedFor(state.network_name));

  useEffect(() => {
    setIsGraphqlClientSupported(
      getIsGraphqlClientSupportedFor(state.network_name),
    );
  }, [state.network_name]);

  return isGraphqlClientSupported;
}
