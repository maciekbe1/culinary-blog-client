import React, { useEffect, useState, useContext } from "react";
import "../assets/styles/AllPosts.scss";
import PostThumbnail from "../components/Posts/PostThumbnail";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Context from "../context";

const POSTS_QUERY = gql`
    query getAllPosts($first: Int!, $skip: Int!) {
        AllPosts(first: $first, skip: $skip) {
            posts {
                _id
                title
                text
                date
                city
                street
            }
            postCount
        }
    }
`;

export default function AllPosts(props) {
    const [pages, setPages] = useState(0);
    let skip = props.match.params.id - 1;

    const { dispatch } = useContext(Context);
    useEffect(() => {
        dispatch({
            type: "CURRENT_POST_PAGE",
            payload: props.match.params.id
        });
    }, [dispatch, props.match.params.id]);
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
                        <Query
                            query={POSTS_QUERY}
                            variables={{
                                first: 2,
                                skip: skip + 1
                            }}
                        >
                            {({ loading, error, data }) => {
                                if (loading) return <h4>Loading...</h4>;
                                if (error) console.log(error);
                                setPages(data.AllPosts.postCount);
                                // console.log(data);
                                return (
                                    <>
                                        <PostThumbnail
                                            entries={data.AllPosts.posts || []}
                                        />
                                        {["1", "2"].map((item, index) => {
                                            return (
                                                <Link
                                                    key={index}
                                                    to={`/posts/${index + 1}`}
                                                >
                                                    page {index + 1}
                                                </Link>
                                            );
                                        })}
                                    </>

                                    // <>
                                    //     {data.AllPosts.map((item, index) => {
                                    //         return (
                                    //             <PostThumbnail
                                    //                 key={index}
                                    //                 data={item}
                                    //             />
                                    //         );
                                    //     })}
                                    //     <button
                                    //         type="button"
                                    //         onClick={() =>
                                    //             fetchMore({
                                    //                 variables: {
                                    //                     first: 1,
                                    //                     skip: 2
                                    //                 },
                                    //                 updateQuery: (
                                    //                     previousResult,
                                    //                     { fetchMoreResult }
                                    //                 ) => {
                                    //                     console.log(
                                    //                         fetchMoreResult
                                    //                     );
                                    //                 }
                                    //             })
                                    //         }
                                    //     >
                                    //         More
                                    //     </button>
                                    // </>
                                );
                            }}
                        </Query>
                    </div>
                </div>
            </div>
        </div>
    );
}
