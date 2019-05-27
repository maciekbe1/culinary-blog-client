import React, { useState } from "react";

const initialFormState = {
    login: "",
    password: "",
    email: ""
};

export default function Signup() {
    const [form, setForm] = useState(initialFormState);
    const [user, setUser] = useState(null);

    const handleChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };
    const handleSubmit = event => {
        event.preventDefault();
        setUser(form);
        setForm(initialFormState);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="login"
                    name="login"
                    onChange={handleChange}
                    value={form.login}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                />
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                />
                <button type="submit">Submit</button>
            </form>
            {user && JSON.stringify(user, null, 2)}
        </div>
    );
}
