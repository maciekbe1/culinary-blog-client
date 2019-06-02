import React, { useContext, useReducer } from "react";
import "./assets/styles/global.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Navigation from "./components/Navigation";

import Homepage from "./pages/Homepage";
// import ProtectedRoute from "./pages/ProtectedRoute";
import AllPosts from "./pages/Posts";
import Post from "./components/Posts/Post";

import Context from "./context";
import reducer from "./reducer";
import Footer from "./components/Footer";

function App(props) {
    const initialState = useContext(Context);
    const [state, dispatch] = useReducer(reducer, initialState);

    const client = new ApolloClient({
        uri: "http://localhost:4000/graphql"
    });

    return (
        <Context.Provider value={{ state, dispatch }}>
            <ApolloProvider client={client}>
                <div className="App container-fluid dark-theme">
                    <BrowserRouter>
                        <Navigation />
                        <Switch>
                            <Route
                                path="/"
                                exact
                                render={render => <Homepage {...render} />}
                            />
                            <Route path="/posts/post/:id" component={Post} />
                            <Route path="/posts" component={AllPosts} />
                        </Switch>
                        <Footer />
                    </BrowserRouter>
                </div>
            </ApolloProvider>
        </Context.Provider>
    );
}

export default App;
