import 'react-native-gesture-handler';
import "react-native-devsettings/withAsyncStorage";
import { StyleSheet } from 'react-native'
import React from 'react'
import StackNavigation from './src/navigation/StackNavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from 'apollo-link-error';


const App = () => {

  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };


  const stores = 'sp-tanvi';
  const ApiVersion = '2023-10';
  const decryptedToken = '3c46d003a55d9b031a61c9bafb4d48c3';


  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        'X-Shopify-Storefront-Access-Token': decryptedToken,
        Accept: 'application/json',
        // Add other headers if needed
      },
    });
    return forward(operation);
  });
  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(message, locations, path, 'location, path Client test'),
          );
        if (networkError)
          console.log(`[Network error Client test]: ${networkError}`);
      }),
      new HttpLink({
        uri: `https://${stores}.myshopify.com/api/${ApiVersion}/graphql.json`,
        headers: {
          'X-Shopify-Storefront-Access-Token': decryptedToken,
          Accept: 'application/json',
        },
        credentials: 'same-origin',
      }),
    ]),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
    clientState: { defaults: {}, resolvers: {} },
  });





  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StackNavigation />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </>
  )
}

export default App

const styles = StyleSheet.create({});