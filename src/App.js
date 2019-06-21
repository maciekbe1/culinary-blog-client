import React, { useContext, useReducer } from "react";
import "./assets/styles/global.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { withCookies } from "react-cookie";

//pages
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./pages/ProtectedRoute";
import Posts from "./pages/Posts";
import Panel from "./pages/Panel";

//components
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Post from "./components/Posts/Post";

//context
import Context from "./context";
import reducer from "./reducer";

function App(props) {
    const initialState = useContext(Context);
    const [state, dispatch] = useReducer(reducer, initialState);

    // const link = createHttpLink({
    //     uri: "http://localhost:4000/graphql",
    //     credentials: 'same-origin'
    //   });
    // const client = new ApolloClient({
    //     uri: "http://localhost:4000/graphql"
    // });
    const httpLink = createHttpLink({
        uri: "http://localhost:4000/graphql"
    });

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = sessionStorage.getItem("token");
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? token : ""
            }
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    return (
        <Context.Provider value={{ state, dispatch }}>
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <div className="App container-fluid dark-theme">
                        <Navigation />
                        <Switch>
                            <Route
                                path="/"
                                exact
                                render={render => <Homepage {...render} />}
                            />
                            <Route path="/posts/post/:id" component={Post} />
                            <Route path="/posts" component={Posts} />
                            <ProtectedRoute path="/panel" component={Panel} />
                        </Switch>
                        <Footer />
                    </div>
                </ApolloProvider>
            </BrowserRouter>
        </Context.Provider>
    );
}

export default withCookies(App);
