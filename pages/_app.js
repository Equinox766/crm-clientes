import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";

const MyApp = ({ Component, pageProps}) => {
    
    return  (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}
MyApp.defaultProps = {
    returnNullOnFailedQueries: true,
};

export default MyApp;