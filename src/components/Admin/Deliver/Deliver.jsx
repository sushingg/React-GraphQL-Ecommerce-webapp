import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import _ from "lodash";
import {
  Button,
  Form,
  Segment,
  Message,
  Dropdown,
  Table,
  Label,
  Icon
} from "semantic-ui-react";

class Deliver extends React.Component {
  state = {
    deliver: this.props.deliver,
    value: "",
    selected: []
  };
  handleChange = (e, { value, text }) => {
    this.setState({ value });
  };
  handleItemClick = () => {
    if (this.state.value !== "") {
      let a = this.state.deliver;
      let b = _.find(a, { key: this.state.value });
      _.remove(a, {
        key: this.state.value
      });

      console.log(b);
      this.setState({
        selected: [...this.state.selected, b],
        deliver: a,
        value: ""
      });
    }
  };
  render() {
    console.log(this.state);
    const { deliver, value, selected } = this.state;
    return (
      <>
        <Query
          fetchPolicy="network-only"
          query={gql`
            {
              usersOrder(status: "successful") {
                id
                email
                name
                order {
                  id
                  createdAt
                  total
                  status
                }
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading)
              return (
                <Segment textAlign="center">
                  <Message compact>loading</Message>
                </Segment>
              );
            if (error)
              return (
                <Segment textAlign="center">
                  <Message warning compact>
                    {error.message}
                  </Message>
                </Segment>
              );

            return (
              <>
                <Segment>
                  <Form>
                    <Form.Field>
                      <label>Order Id</label>
                      <Dropdown
                        placeholder="ระบุหมายเลขรายการที่จัดส่งแล้ว"
                        fluid
                        search
                        selection
                        onChange={this.handleChange}
                        value={value}
                        options={deliver}
                      />
                    </Form.Field>
                    <Button fluid onClick={this.handleItemClick}>
                      เพิ่ม
                    </Button>
                  </Form>
                </Segment>
                <Segment>
                  <Table stackable padded>
                    <Table.Body>
                      {selected &&
                        selected.map((thisOrder, y) => (
                          <Table.Row key={y}>
                            <Table.Cell>
                              <Label basic>
                                <Icon name="file outline" />
                                {thisOrder.value}
                              </Label>
                            </Table.Cell>
                            <Table.Cell>
                              <Label basic>{thisOrder.description}</Label>
                            </Table.Cell>
                            <Table.Cell>
                              <Label basic color="red">
                                <Icon name="remove" />
                                ลบ
                              </Label>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                  <Button fluid>Submit</Button>
                </Segment>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Deliver;
