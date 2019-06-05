import React from 'react';
import { Link } from "react-router-dom";
import { Table,Icon,Label } from 'semantic-ui-react'
const ListProduct = (props) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Label basic as={Link} to={"/admin/p/" + props.product.slug}>
          {props.product.title}
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Label tag>{props.product.price + " ฿"}</Label>
      </Table.Cell>
      <Table.Cell textAlign='right'>
        {(() => {
          switch (props.product.published) {
            case "published":
              return <Label color="green">Published</Label>;
            default:
              return <Label color="yellow">Draft</Label>;

          }
        })()}
        <Label basic><Icon name='edit'/>edit</Label>
        <Label 
          basic 
          color='red'
          as={Link} to={"/admin/removeproduct/" + props.product.id}
        >
          <Icon name='delete'/>
          delete
        </Label>
      </Table.Cell>
    </Table.Row>
  );

};

export default ListProduct;
