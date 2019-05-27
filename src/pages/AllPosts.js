import React from "react";
import data from "../data/posts";
import "../assets/styles/AllPosts.scss";
import { dateConverter } from "../containers/dateConverter";

export default function AllPosts() {
    return (
        <div className="post-list">
            <div className="container">
                <h2>Wszystkie posty</h2>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="filters border border-secondary p-3">
                            <h2>Filtry:</h2>
                            <div className="mt-3">
                                <p>Miasto:</p>
                                <input
                                    className="w-100"
                                    type="text"
                                    name="city"
                                />
                            </div>
                            <div className="mt-3">
                                <p>Typ:</p>
                                <select
                                    type="text"
                                    className="w-100 border border-secondary"
                                >
                                    <option />
                                    {data.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {item.type}
                                            </option>
                                        );
                                    })}{" "}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        {data.map((post, index) => {
                            return (
                                <div
                                    key={index}
                                    className="post border border-secondary mb-3"
                                >
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <img
                                                className="w-100 p-3"
                                                src={require(`../assets/images/posts/${
                                                    post.image
                                                }`)}
                                                alt=""
                                            />
                                        </div>
                                        <div className="col-sm-8 ">
                                            <div className="m-3">
                                                <div className="">
                                                    <h2>{post.title}</h2>
                                                    <div className="row">
                                                        <p className="col-sm-4">
                                                            Data:{" "}
                                                            {dateConverter(
                                                                post.data
                                                            )}
                                                        </p>
                                                        <p className="col-sm-4">
                                                            Gdzie:{" "}
                                                            {" " + post.city}
                                                        </p>
                                                        <p className="col-sm-4">
                                                            Typ:{" "}
                                                            {" " + post.type}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>{post.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
