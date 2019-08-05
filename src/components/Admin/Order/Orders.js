import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Order from "./Order";

import ReactToPrint from "react-to-print";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import { formatDate, parseDate } from "react-day-picker/moment";

import { Table, Message, Menu, Radio, Icon, Button } from "semantic-ui-react";
class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      status: "wait",
      from: undefined,
      to: undefined,
      checked: false,
      dateForm: undefined,
      dateTo: undefined
    };
  }

  handleItemClick = (e, { name }) => this.setState({ status: name });
  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), "months") < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }
  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
    if (this.state.checked) {
      this.setState({
        dateForm: String(moment(from).unix() * 1000)
      });
    }
  }
  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    if (this.state.checked) {
      this.setState({
        dateTo: String(moment(to).unix() * 1000)
      });
    }
  }

  toggle = () => {
    const { from, to } = this.state;
    if (from && to) {
      this.setState(prevState => ({
        checked: !prevState.checked,
        dateForm: String(moment(from).unix() * 1000),
        dateTo: String(moment(to).unix() * 1000)
      }));
    }
  };
  render() {
    const { status, from, to, dateForm, dateTo } = this.state;
    const modifiers = { start: from, end: to };

    console.log(moment(from).unix() * 1000 + ":" + moment(to).unix() * 1000);
    return (
      <>
        <Menu tabular>
          <Menu.Item
            name="wait"
            active={status === "wait"}
            onClick={this.handleItemClick}
          >
            ที่ต้องชำระ
          </Menu.Item>
          <Menu.Item
            name="successful"
            active={status === "successful"}
            onClick={this.handleItemClick}
          >
            ที่ต้องจัดส่ง
          </Menu.Item>
          <Menu.Item
            name="sended"
            active={status === "sended"}
            onClick={this.handleItemClick}
          >
            สำเร็จ
          </Menu.Item>
          <Menu.Item
            name="cancel"
            active={status === "cancel"}
            onClick={this.handleItemClick}
          >
            ยกเลิกแล้ว
          </Menu.Item>
          <Menu.Item position="right">กรองโดยวันที่/เดือน</Menu.Item>
          <Menu.Item>
            <Radio slider onChange={this.toggle} checked={this.state.checked} />
          </Menu.Item>
          <Menu.Item>
            <div className="InputFromTo">
              <DayPickerInput
                value={from}
                placeholder="เลือกวันที่"
                format="LL"
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  selectedDays: [from, { from, to }],
                  disabledDays: { after: to },
                  toMonth: to,
                  modifiers,
                  numberOfMonths: 2,
                  onDayClick: () => this.to.getInput().focus()
                }}
                onDayChange={this.handleFromChange}
              />{" "}
              —{" "}
              <span className="InputFromTo-to">
                <DayPickerInput
                  ref={el => (this.to = el)}
                  value={to}
                  placeholder="ถึงวันที่"
                  format="LL"
                  formatDate={formatDate}
                  parseDate={parseDate}
                  dayPickerProps={{
                    selectedDays: [from, { from, to }],
                    disabledDays: { before: from },
                    modifiers,
                    month: from,
                    fromMonth: from,
                    numberOfMonths: 2
                  }}
                  onDayChange={this.handleToChange}
                />
              </span>
            </div>
          </Menu.Item>
          <Menu.Item>
            <ReactToPrint
              trigger={() => <Button compact basic>พิมพ์รายงาน</Button>}
              content={() => this.componentRef}
            />
          </Menu.Item>
        </Menu>

        <Query
          fetchPolicy="network-only"
          query={gql`
            query usersOrder(
              $status: String
              $dateForm: String
              $dateTo: String
            ) {
              usersOrder(
                status: $status
                dateForm: $dateForm
                dateTo: $dateTo
              ) {
                name
                id
                total
                status
                address {
                  firstName
                  lastName
                  addr
                  distric
                  province
                  mobileNumber
                  postcode
                }
                orderProduct {
                  slug
                  title
                  price
                  option
                  quantity
                }
                createdAt
                updatedAt
              }
            }
          `}
          variables={{ status, dateForm, dateTo }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading)
              return (
                <Message icon>
                  <Icon name="circle notched" loading />
                  <Message.Content>
                    <Message.Header>รอสักครู่</Message.Header>
                    กำลังดึงข้อมูลจากเซิฟเวอร์
                  </Message.Content>
                </Message>
              );
            if (error)
              return (
                <Message warning>
                  <Message.Header>มีบางอย่างผิดปกติ!</Message.Header>
                  <p>{error.message}</p>
                </Message>
              );
            return (
              <>
                <ComponentToPrint
                  data={data}
                  refetch={refetch}
                  ref={el => (this.componentRef = el)}
                />
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

class ComponentToPrint extends React.Component {
  render() {
    return (
      <Table stackable padded celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="6">รายการสั่งซื้อ</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell colSpan="1">หมายเลขการสั่งซื้อ</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">วันที่สร้าง</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">วันที่แก้ไข</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">ผู้ซื้อ</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">ยอดเงิน</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">สถานะ</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.data.usersOrder.map((currentOrder, i) => (
            <Order
              key={i}
              order={currentOrder}              
              refetch={this.props.refetch}
              user={{
                name: currentOrder.name
              }}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}
export default Orders;
