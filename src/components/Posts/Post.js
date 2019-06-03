import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import GoogleFrame from "../Posts/GoogleFrame";
const POST_QUERY = gql`
    query postQuery($id: ID!) {
        getPost(_id: $id) {
            title
            city
            street
        }
    }
`;
export default function Post(props) {
    const { id } = props.match.params;
    return (
        <div className="post">
            <Query query={POST_QUERY} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) return <h2>Loading...</h2>;
                    if (error) console.log(error);
                    return (
                        <div>
                            <h1>{data.getPost.title}</h1>
                            <GoogleFrame
                                city={data.getPost.city}
                                street={data.getPost.street}
                            />
                            <p>{data.getPost.city}</p>
                            <p>{data.getPost.street}</p>
                            <p>{id}</p>
                        </div>
                    );
                }}
            </Query>
        </div>
    );
}
