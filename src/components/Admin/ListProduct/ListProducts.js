import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ListProduct from "./ListProduct";
import Categories from "./Categories"
import {
  Table,
  Message,
  Button,
  Radio,
  Pagination,
  Header
} from "semantic-ui-react";
class ListProducts extends React.Component {
  state = {
    page: 1,
    activePage: 1,
    incDraft: true
  };
  handleItemClick = (e, { name }) => this.setState({ params: name });
  setActivePage = e => this.setState({ activePage: e });
  toggleDraft = () => this.setState(prevState => ({ incDraft: !prevState.incDraft }))
  render() {
    console.log(this.props.match.params)
    const category = this.props.match.params.category||""
    const subCategory = this.props.match.params.subCategory||""
    const { page, activePage, incDraft } = this.state;
    return (
      <>
      <Categories/>
      <Table stackable padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">Product list</Table.HeaderCell>
            <Table.HeaderCell colSpan="1" textAlign="right">
            <Radio label='รวมดราฟ' toggle onClick={this.toggleDraft} checked={incDraft} />
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell colSpan="1">Products</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">Price</Table.HeaderCell>
            <Table.HeaderCell colSpan="1" textAlign="right">
              Published
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Query
            fetchPolicy="network-only"
            query={gql`
              query GetProduct(
                $category: String
                $subCategory: String
                $page: Int!
                $incDraft: Boolean
              ) {
                products(
                  category: $category
                  subCategory: $subCategory
                  limit: 25
                  page: $page
                  incDraft:$incDraft
                ) {
                  product {
                    slug
                    title
                    price
                    description
                    descriptionHtml
                    category
                    subCategory
                    quantity
                    published
                    image {
                      altText
                      name
                    }
                  }
                  total
                  limit
                  page
                  pages
                }
              }
            `}
            variables={{ category, subCategory, page, incDraft }}
          >
            {({ loading, error, data, refetch }) => {
              if (loading)
                return (
                  <Table.Row>
                    <Table.Cell colSpan="6" textAlign="center">
                      <Message compact>loading</Message>
                    </Table.Cell>
                  </Table.Row>
                );
              if (error)
                return (
                  <Table.Row>
                    <Table.Cell colSpan="6" textAlign="center">
                      <Message warning compact>
                        {error.message}
                      </Message>
                    </Table.Cell>
                  </Table.Row>
                );
              return (
                <>
                  {data.products.product.map((currentProduct, i) => (
                    <ListProduct
                      key={i}
                      product={currentProduct}
                      refetch={refetch}
                    />
                  ))}
                  <Table.Row>
                    <Table.Cell colSpan="6" textAlign="center">
                      <Pagination
                        activePage={activePage}
                        totalPages={data.products.pages}
                        onPageChange={(e, { activePage }) =>
                          this.setActivePage(activePage)
                        }
                      />
                      <Header as="h4" textAlign="center">
                        {"Total:" +
                          data.products.total +
                          " | Page: " +
                          data.products.page +
                          " of " +
                          data.products.pages +
                          " | Limit " +
                          data.products.limit +
                          " items/pages"}
                      </Header>
                      <Button fluid onClick={() => refetch()}>
                        reload
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </>
              );
            }}
          </Query>
        </Table.Body>
      </Table>
      </>
    );
  }
}
export default ListProducts;
