import React, { useState, useEffect } from "react";
import "../assets/styles/AllPosts.scss";
import { dateConverter } from "../containers/dateConverter";
import image from "../assets/images/posts/post1.png";
import { Link } from "react-router-dom";
import axios from "axios";
export default function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("http://localhost:4000/api/posts");
            setPosts(result.data);
        };
        fetchData();
    }, []);
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
                            {/* <div className="mt-3">
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
                            </div> */}
                        </div>
                    </div>
                    <div className="col-lg-9">
                        {posts.map((post, index) => {
                            return (
                                <div
                                    key={index}
                                    className="post border border-secondary mb-3 p-3"
                                >
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <img
                                                className="w-100"
                                                // src={require(`../assets/images/posts/${
                                                //     post.image
                                                // }`)}
                                                src={image}
                                                alt=""
                                            />
                                        </div>
                                        <div className="col-sm-8 ">
                                            <div className="">
                                                <div className="">
                                                    <h2>{post.title}</h2>
                                                    <div className="row">
                                                        <p className="col-sm-4">
                                                            Data:{" "}
                                                            {dateConverter(
                                                                post.created
                                                            )}
                                                        </p>
                                                        <p className="col-sm-4">
                                                            Gdzie:{" "}
                                                            {" " + post.city}
                                                        </p>
                                                        {/* <p className="col-sm-4">
                                                            Typ:{" "}
                                                            {" " + post.type}
                                                        </p> */}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>{post.text}</p>
                                                    <Link
                                                        to={`/post/${
                                                            post.title
                                                        }`}
                                                    >
                                                        Przeczytaj
                                                    </Link>
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
