import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/AllPosts.scss";
import PostThumbnail from "../components/Posts/PostThumbnail";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Context from "../context";
import MyPagination from "../components/MyPagination";
const POSTS_QUERY = gql`
    query getAllPosts($first: Int!, $skip: Int!, $search: String!) {
        AllPosts(first: $first, skip: $skip, search: $search) {
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
    let pageId = props.match.params.id;
    const { dispatch } = useContext(Context);
    const [postInput, setPostInput] = useState("");
    const [postName, setPostName] = useState("");
    const itemsOnPage = 2;
    useEffect(() => {
        dispatch({
            type: "CURRENT_POST_PAGE",
            payload: pageId
        });
    }, [dispatch, pageId]);
    const getResoults = () => {
        setPostName(postInput);
    };
    return (
        <div className="post-list">
            <div className="container">
                <h2>Wszystkie posty</h2>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="filters border border-secondary p-3">
                            <h2>Filtry:</h2>
                            <div className="mt-3">
                                <p>Nazwa postu:</p>
                                <input
                                    className="w-100"
                                    type="text"
                                    name="postName"
                                    onChange={event =>
                                        setPostInput(event.target.value)
                                    }
                                    value={postInput}
                                />
                                <Link
                                    className="btn"
                                    to={"/posts/1"}
                                    type="button"
                                    onClick={getResoults}
                                >
                                    Filter
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <Query
                            query={POSTS_QUERY}
                            variables={{
                                first: itemsOnPage,
                                skip: (pageId - 1) * itemsOnPage,
                                search: postName
                            }}
                        >
                            {({ loading, error, data }) => {
                                if (loading) return <h4>Loading...</h4>;
                                if (error) console.log(error);
                                return (
                                    <>
                                        <PostThumbnail
                                            entries={data.AllPosts.posts}
                                        />
                                        {data.AllPosts.postCount >
                                        itemsOnPage ? (
                                            <MyPagination
                                                total={data.AllPosts.postCount}
                                                pathname={"posts"}
                                                itemsOnPage={itemsOnPage}
                                                page={parseInt(pageId, 10)}
                                            />
                                        ) : null}
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
