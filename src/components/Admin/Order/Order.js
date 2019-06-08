import React from 'react';
import { Link } from "react-router-dom";
import { Table,Icon,Label } from 'semantic-ui-react'
import moment from 'moment'
const Product = (props) => {
moment.locale('th');  
  return (
    <Table.Row>
      <Table.Cell>
        
        <Label basic as={Link} to={"/admin/o/" + props.order.id}>
          <Icon name="file outline" />
          View Order
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Label basic>{moment(props.order.createdAt/1000).format("lll")}</Label>
        <Label basic>
          Email
          <Label.Detail>{props.user.email}</Label.Detail>
        </Label>
        <Label basic>
          User
          <Label.Detail>{props.user.name}</Label.Detail>
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Label tag>{props.order.total + " ฿"}</Label>
      </Table.Cell>
      <Table.Cell>
        {(() => {
          switch (props.order.status) {
            case null:
              return <Label color="yellow">Wait for paid</Label>;
            case "successful":
              return <Label color="green">successful</Label>;
            case "failed":
              return <Label color="red">failed</Label>;
            case "cancel":
              return <Label color="red">Cancel</Label>;
            default:
              return <Label>Wait for paid</Label>;
          }
        })()}
      </Table.Cell>
    </Table.Row>
  );

};

export default Product;
