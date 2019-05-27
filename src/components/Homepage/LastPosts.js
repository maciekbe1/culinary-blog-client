import React from "react";
import data from "../../data/posts";

export default function LastPosts() {
    return (
        <div className="last-posts container">
            <h2 className="text-center">Ostatnie posty</h2>
            <div className="row text-center">
                {data.slice(0, 3).map(post => {
                    return (
                        <div key={post.id} className="col-xl-4 col-md-6">
                            <div className="square">
                                <img
                                    src={require(`../../assets/images/posts/${
                                        post.image
                                    }`)}
                                    alt=""
                                />
                                <h3>{post.title}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
