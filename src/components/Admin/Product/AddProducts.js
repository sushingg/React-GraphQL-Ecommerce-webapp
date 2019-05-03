import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AddProduct from "./AddProduct";
import Loader from "../../Loader";
import { Segment, Message } from "semantic-ui-react";

class Products extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <Query
        query={gql`
          {
            categories {
              categoryTags {
                tag
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error)
            return (
              <Segment basic textAlign="center">
                <Message warning compact>
                  {error.message}
                </Message>
              </Segment>
            );
          return data.categories.map((currentCategory, i) => (
            <AddProduct key={i} category={currentCategory} history={this.props.history}/>
          ));
        }}
      </Query>
    );
  }
}
export default Products;
