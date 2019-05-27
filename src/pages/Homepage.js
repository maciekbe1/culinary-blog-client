import React from "react";
import Jumbotron from "../components/Homepage/Jumbotron";
import "../assets/styles/Homepage.scss";
import LastPosts from "../components/Homepage/LastPosts";

export default function Homepage() {
    return (
        <div className="home-page">
            <Jumbotron />
            <LastPosts />
        </div>
    );
}
