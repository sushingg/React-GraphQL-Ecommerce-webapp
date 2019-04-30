import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Category from './Category';
import Loader from '../Loader';
import {Segment, Message} from 'semantic-ui-react'

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
					  if (error) return <Segment basic textAlign="center"><Message warning compact>{error.message}</Message></Segment>;
						return data.categories.map((currentCategory,i) => (
						<Category key={i} category={currentCategory} />
						));

					}}
				</Query>
	)
}
}
export default Products;
