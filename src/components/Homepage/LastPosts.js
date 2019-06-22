import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import image from "../../assets/images/posts/post1.png";

const POSTS_QUERY = gql`
    query getAllPosts($first: Int!, $skip: Int!) {
        AllPosts(first: $first, skip: $skip) {
            posts {
                _id
                title
            }
        }
    }
`;

export default function LastPosts() {
    return (
        <div className="last-posts container">
            <h2 className="text-center">Ostatnie posty</h2>
            <div className="row text-center">
                <Query
                    query={POSTS_QUERY}
                    variables={{
                        first: 3,
                        skip: 0
                    }}
                >
                    {({ loading, error, data }) => {
                        if (loading) return <h2>Loading..</h2>;
                        if (error) console.log(error);
                        return data.AllPosts.posts.map((post, index) => {
                            return (
                                <div key={index} className="col-xl-4 col-md-6">
                                    <div className="square">
                                        <img src={image} alt="" />
                                        <h3>{post.title}</h3>
                                    </div>
                                </div>
                            );
                        });
                    }}
                </Query>
            </div>
        </div>
    );
}
