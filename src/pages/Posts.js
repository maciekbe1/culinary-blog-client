import React from "react";
import "../assets/styles/AllPosts.scss";
import PostThumbnail from "../components/Posts/PostThumbnail";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const POSTS_QUERY = gql`
    query {
        posts {
            id
            title
            text
            date
            city
            street
        }
    }
`;

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
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <Query query={POSTS_QUERY}>
                            {({ loading, error, data }) => {
                                if (loading) return <h4>Loading...</h4>;
                                if (error) console.log(error);
                                return (
                                    <>
                                        {data.posts.map((item, index) => {
                                            return (
                                                <PostThumbnail
                                                    key={index}
                                                    data={item}
                                                />
                                            );
                                        })}
                                    </>
                                );
                            }}
                        </Query>
                    </div>
                </div>
            </div>
        </div>
    );
}
