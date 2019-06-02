import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/posts/post1.png";
import Moment from "react-moment";
export default function PostThumbnail(props) {
    return (
        <div className="post border border-secondary mb-3 p-3">
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
                            <h2>{props.data.title}</h2>
                            <div className="row">
                                <p className="col-sm-4">
                                    Data:{" "}
                                    <Moment format="YYYY/MM/DD">
                                        {props.data.date}
                                    </Moment>
                                </p>
                                <p className="col-sm-4">
                                    Gdzie: {" " + props.data.city}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p>{props.data.text}</p>
                            <Link to={`/post/${props.data.title}`}>
                                Przeczytaj
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
