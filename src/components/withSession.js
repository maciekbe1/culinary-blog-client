// import React from "react";
// import { Query } from "react-apollo";
// import gql from "graphql-tag";
// const GET_CURRENT_USER = gql`
//     query {
//         getCurrentUser {
//             login
//         }
//     }
// `;
// const withSession = Component => props => (
//     <Query query={GET_CURRENT_USER}>
//         {({ data, loading }) => {
//             if (loading) return null;
//             console.log(data);
//             return <Component {...props} />;
//         }}
//     </Query>
// );
// export default withSession;
