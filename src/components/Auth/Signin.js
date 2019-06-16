import React, { useState, useContext, useEffect } from "react";
import Context from "../../context";
import Error from "../Error";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
const SIGNIN_QUERY = gql`
    mutation signInMutation($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
            userId
            login
            token
            tokenExp
        }
    }
`;
export default function Signin() {
    const { dispatch } = useContext(Context);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    // const [loginFailure, setLoginFailure] = useState(false);
    // const [loading, setLoading] = useState(false);
    // const [user, setUser] = useState(null);
    const sessionToken = sessionStorage.getItem("token");
    const sessionLogin = sessionStorage.getItem("login");
    useEffect(() => {
        if (sessionToken) {
            dispatch({
                type: "IS_AUTH",
                payload: {
                    isAuth: true,
                    login: sessionLogin
                }
            });
        }
    }, [dispatch, sessionToken, sessionLogin]);

    const onSignin = (e, signIn) => {
        e.preventDefault();
        signIn().then(({ data }) => {
            setPassword("");
            setLogin("");
            document.querySelector("#closeLoginModal").click();
            sessionStorage.setItem("token", data.signIn.token);
            sessionStorage.setItem("login", data.signIn.login);
            dispatch({
                type: "SIGNIN_USER",
                payload: {
                    isAuth: true,
                    token: data.signIn.token,
                    login: data.signIn.login
                }
            });
        });
    };
    const validateForm = () => {
        const isInvalid = !login || !password;
        return isInvalid;
    };
    return (
        <div
            className="modal fade"
            id="loginModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="loginModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title" id="loginModalLabel">
                            Login panel
                        </h5>
                        <button
                            type="button"
                            className="close text-light"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Mutation
                            mutation={SIGNIN_QUERY}
                            variables={{ login, password }}
                        >
                            {(signIn, { data, loading, error }) => {
                                return (
                                    <form
                                        id="signInModal"
                                        // onKeyPress={e =>
                                        //     e.key === "Enter" ? onSignin() : null
                                        // }
                                        onSubmit={e => onSignin(e, signIn)}
                                    >
                                        <div className="form-group">
                                            <label
                                                htmlFor="recipient-name"
                                                className="col-form-label"
                                            >
                                                Login:
                                            </label>
                                            <input
                                                className="form-control"
                                                id="login"
                                                type="text"
                                                placeholder="Login"
                                                onChange={event =>
                                                    setLogin(event.target.value)
                                                }
                                                value={login}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label
                                                htmlFor="recipient-name"
                                                className="col-form-label"
                                            >
                                                Password:
                                            </label>
                                            <input
                                                className="form-control"
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                onChange={event =>
                                                    setPassword(
                                                        event.target.value
                                                    )
                                                }
                                                value={password}
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                id="closeLoginModal"
                                                type="button"
                                                className="btn btn-secondary"
                                                data-dismiss="modal"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                                disabled={
                                                    !login || validateForm()
                                                }
                                            >
                                                {loading ? (
                                                    <span
                                                        className="spinner-border spinner-border-sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    "Sign in"
                                                )}
                                            </button>
                                        </div>
                                        {error && <Error error={error} />}
                                    </form>
                                );
                            }}
                        </Mutation>

                        {/* {loginFailure ? (
                            <div className="text-danger">
                                Wrong login or password!
                            </div>
                        ) : null} */}
                    </div>
                </div>
            </div>
        </div>
    );
}
