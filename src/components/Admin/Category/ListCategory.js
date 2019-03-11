import React from 'react';
import { Link } from "react-router-dom";
import { Table,Icon,Label } from 'semantic-ui-react'
import moment from 'moment'
const ListProduct = (props) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Label basic as={Link} to={"/admin/p/" + props.product.productSlug}>
          {props.product.productTitle}
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Label tag>{props.product.productPrice + " ฿"}</Label>
      </Table.Cell>
      <Table.Cell textAlign='right'>
        {(() => {
          switch (props.product.productPublished) {
            case "published":
              return <Label color="green">Published</Label>;
            default:
              return <Label color="yellow">Draft</Label>;
          }
        })()}
        <Label basic color='red'><Icon name='delete'/> delete</Label>
      </Table.Cell>
    </Table.Row>
  );

};

export default ListProduct;
