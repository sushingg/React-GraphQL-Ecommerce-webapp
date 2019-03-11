import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Category from './Category';
import Loader from '../Loader';
import {  Alert } from 'reactstrap';

class Products extends React.Component {
  state = {
  }
  componentDidMount () {
	
  }
  render() {
	return(
				<Query
					query={gql`
						{
							categories{
								id
								categorySlug
								categoryTitle
								categoryTags{
									tag
								}
							}
						}
					  `
					}
					
				>
					{({ loading, error, data }) => {
					  if (loading) return <Loader/>;
					  if (error) return <Alert className="text-center col" color="danger">Error :${error.message}</Alert>;
						return data.categories.map((currentCategory,i) => (
						<Category key={i} category={currentCategory} />
						));

					}}
				</Query>
	)
}
}
export default Products;
