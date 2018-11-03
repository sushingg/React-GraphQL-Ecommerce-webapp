import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Product from './Product';
import Loader from '../Loader';
const Products = () => (
  <Query
    query={gql`
      {
        products {
          productSlug
          productTitle
          productPrice
          productDescription
          productTags
          productAddedDate
          productImage
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loader/>;
      if (error) return <p>Error :${error.message}</p>;
		return data.products.map((currentProduct) => (
			<Product key={currentProduct.id} product={currentProduct} />
		));

    }}
  </Query>
	);
export default Products;
