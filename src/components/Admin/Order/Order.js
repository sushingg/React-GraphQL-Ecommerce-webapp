import React from "react";
import { Link } from "react-router-dom";
import { Table, Icon, Label } from "semantic-ui-react";
import moment from "moment";
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'THB',
  minimumFractionDigits: 2
})
const Product = props => {
  moment.locale("th");
  return (
    <Table.Row>
      <Table.Cell>
        <Label basic as={Link} to={"/admin/o/" + props.order.id}>
          <Icon name="file outline" />
          { props.order.id}
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Label basic>
          {moment.unix((props.order.createdAt)/1000).format("llll")}
        </Label>
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
        <Label tag>{formatter.format(props.order.total)}</Label>
      </Table.Cell>
      <Table.Cell>
        {(() => {
          switch (props.order.status) {
            case "successful":
              return <Label color="yellow">รอการจัดส่ง</Label>;
            case "sended":
              return <Label color="green">สำเร็จ</Label>;
            case "cancel":
              return <Label color="red">ยกเลิก</Label>;
            default:
              return <Label>รอการชำระเงิน</Label>;
          }
        })()}
      </Table.Cell>
    </Table.Row>
  );
};

export default Product;
