import React from "react";
import jumbotron from "../../assets/images/1.png";

export default function Jumbotron() {
    return (
        <div className="">
            <div className="container">
                <h2 className="text-center">Kulinarna Miedź</h2>
                <img className="w-100" src={jumbotron} alt="" />
            </div>
        </div>
    );
}
