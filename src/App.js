import React, { useContext, useReducer } from "react";
import "./assets/styles/global.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";

import Homepage from "./pages/Homepage";
// import ProtectedRoute from "./pages/ProtectedRoute";
import AllPosts from "./pages/Posts";

import Context from "./context";
import reducer from "./reducer";
import Footer from "./components/Footer";
import Post from "./pages/Post";

function App(props) {
    const initialState = useContext(Context);
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            <div className="App container-fluid dark-theme">
                <BrowserRouter>
                    <Navigation />
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={render => <Homepage {...render} />}
                        />
                        <Route path="/posts" component={AllPosts} />
                        <Route path="/post/:id" component={Post} />
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </div>
        </Context.Provider>
    );
}

export default App;
