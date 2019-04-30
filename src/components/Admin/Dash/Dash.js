import React from "react";
import { Link } from "react-router-dom";
import {
  Segment,
  Header,
  Icon,
  Card,
  Image,
  Statistic
} from "semantic-ui-react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import Order from '../Order/Orders'
const data = [
  {
    name: "January",
    visited: 4000
  },
  {
    name: "February",
    visited: 3000
  },
  {
    name: "March",
    visited: 2000
  },
  {
    name: "April",
    visited: 2780
  },
  {
    name: "May",
    visited: 1890
  },
  {
    name: "June",
    visited: 2390
  },
  {
    name: "July",
    visited: 3490
  }
];
const Dash = props => {
  return (
    <>
      <Card.Group centered itemsPerRow="4">
        <Card color="violet" link>
          <Card.Content>
            <Card.Header>
              <Header as="h1" color="violet">
                <Icon name="balance scale" />
                Monthly sale!
              </Header>
            </Card.Header>
            <Card.Meta textAlign="right">ยอดขายเดือนนี้</Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Statistic color="violet">
              <Statistic.Value>9974</Statistic.Value>
              <Statistic.Label>ชิ้น</Statistic.Label>
            </Statistic>
          </Card.Content>
        </Card>
        <Card color="teal" link>
          <Card.Content>
            <Card.Header>
              <Header as="h1" color="teal">
                <Icon name="money" />
                Profit!
              </Header>
            </Card.Header>
            <Card.Meta textAlign="right">รายได้เดือนนี้</Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Statistic color="teal">
              <Statistic.Value>945151</Statistic.Value>
              <Statistic.Label>บาท</Statistic.Label>
            </Statistic>
          </Card.Content>
        </Card>
        <Card color="blue" link>
          <Card.Content>
            <Card.Header>
              <Header as="h1" color="blue">
                <Icon name="truck" />
                Shipped
              </Header>
            </Card.Header>
            <Card.Meta textAlign="right">ส่งแล้ว</Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Statistic color="blue">
              <Statistic.Value>9974</Statistic.Value>
              <Statistic.Label>ชิ้น</Statistic.Label>
            </Statistic>
          </Card.Content>
        </Card>
        <Card color="yellow" link>
          <Card.Content>
            <Card.Header>
              <Header as="h1" color="yellow">
                <Icon name="truck" />
                Visited
              </Header>
            </Card.Header>
            <Card.Meta textAlign="right">ผู้เยี่ยมชม</Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Statistic color="yellow">
              <Statistic.Value>19295</Statistic.Value>
              <Statistic.Label>คน</Statistic.Label>
            </Statistic>
          </Card.Content>
        </Card>
      </Card.Group>
      <Card.Group centered itemsPerRow="4">
        <Card link>
          <Card.Content>
            <Card.Header>
              <Header as="h1" >
                Customer
              </Header>
            </Card.Header>
            <Card.Meta textAlign="right">ลูกค้าใหม่เดือนนี้</Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra textAlign="center">
          <BarChart
          width={250}
          height={100}
          data={data}
        >
          <XAxis dataKey="name" />
          <Tooltip cursor={false} />
          <Bar dataKey="visited" fill="#8884d8" />
        </BarChart>
          </Card.Content>
        </Card>
        <Card link>
          <Card.Content>
            <Card.Header>
              <Header as="h1" >
                Total Customer!
              </Header>
            </Card.Header>
            <Card.Meta textAlign="right">ลูกค้าทั้งหมด</Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Statistic >
              <Statistic.Value>945151</Statistic.Value>
              <Statistic.Label>คน</Statistic.Label>
            </Statistic>
          </Card.Content>
        </Card>
        <Card  link>
          <Card.Content>
            <Card.Header>
              <Header as="h1" >
                Stock
              </Header>
            </Card.Header>
            <Card.Meta textAlign="right">สินค้า</Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Statistic >
              <Statistic.Value>9974</Statistic.Value>
              <Statistic.Label>ชิ้น</Statistic.Label>
            </Statistic>
          </Card.Content>
        </Card>
        <Card  link>
          <Card.Content>
            <Card.Header>
              <Header as="h1" >
                Billing
              </Header>
            </Card.Header>
            <Card.Meta textAlign="right">บิล</Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Statistic >
              <Statistic.Value>1295</Statistic.Value>
              <Statistic.Label>รายการ</Statistic.Label>
            </Statistic>
          </Card.Content>
        </Card>
      </Card.Group>
      <Order/>
    </>
  );
};

export default Dash;
