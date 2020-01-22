import React from 'react'
import App from 'next/app'
import { AppProvider } from '@shopify/polaris'
import { Provider } from '@shopify/app-bridge-react'
import translations from '@shopify/polaris/locales/ja.json'
import '@shopify/polaris/styles.css'
import Cookies from 'js-cookie'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
declare const API_KEY: string
declare const API_GRAPHQL: string

const client = new ApolloClient({
  uri: API_GRAPHQL,
  fetchOptions: {
    credentials: 'include'
  }
})

class MyApp extends App {
  state = {
    shopOrigin: Cookies.get('shopOrigin')
  }
  render() {
    const { Component, pageProps } = this.props
    const config = {
      apiKey: API_KEY,
      shopOrigin: Cookies.get('shopOrigin'),
      forceRedirect: true
    }
    return (
      <>
        <Provider config={config}>
          <AppProvider i18n={translations}>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </AppProvider>
        </Provider>
      </>
    )
  }
}

export default MyApp
