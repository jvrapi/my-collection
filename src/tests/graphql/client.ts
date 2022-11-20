import ApolloClient from 'apollo-boost'



export const createApolloClient = (serverUrl: string) => {
  return new ApolloClient({
    uri: serverUrl,
  })
}

export { ApolloClient }


