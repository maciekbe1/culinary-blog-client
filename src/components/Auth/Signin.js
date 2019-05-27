import React, { useState } from "react";

export default function Signin() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [loginFailure, setLoginFailure] = useState(false);
    const [loading, setLoading] = useState(false);

    const formHandle = event => {
        event.preventDefault();
        const userData = {
            login,
            password
        };
        setUser(userData);
        setLogin("");
        setPassword("");
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
                        <form
                            id="signInModal"
                            // onKeyPress={e =>
                            //     e.key === "Enter" ? formHandle() : null
                            // }
                            onSubmit={formHandle}
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
                                        setPassword(event.target.value)
                                    }
                                    value={password}
                                />
                            </div>
                        </form>
                        {loginFailure ? (
                            <div className="text-danger">
                                Wrong login or password!
                            </div>
                        ) : null}
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
                        <button className="btn btn-primary" type="submit">
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
                </div>
            </div>
        </div>
    );
}
