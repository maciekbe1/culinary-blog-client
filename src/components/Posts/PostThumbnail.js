import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/posts/post1.png";
import { dateConverter } from "../../containers/dateConverter";
export default function PostThumbnail(props) {
    return (
        <div>
            {props.entries.map((item, index) => {
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
                                        <h2>{item.title}</h2>
                                        <div className="row">
                                            <p className="col-sm-4">
                                                entries:{" "}
                                                {dateConverter(item.date)}
                                            </p>
                                            <p className="col-sm-4">
                                                Gdzie: {" " + item.city}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p>{item._id}</p>
                                        <p>{item.text}</p>
                                        <Link to={`/posts/post/${item._id}`}>
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
    );
}
