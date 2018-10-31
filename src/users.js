import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import User from './user';
const Users = () => (
  <Query
    query={gql`
		{
		  users {
			id
			firstName
			lastName
			email
			created
		  }
		}
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
		return data.users.map((currentUser) => (
			<User user={currentUser} />
		));
	  
    }}
  </Query>
	);
export default Users;
