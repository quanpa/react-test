import React from "react";
import { Table } from "antd";

interface AccountListState {
  accounts: any,
}

class AccountList extends React.Component<any, AccountListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      accounts: []
    }
  }

  componentDidMount() {
    const idUser = this.props.match?.params.id;
    if (!idUser) return;
    fetch(`https://sample-accounts-api.herokuapp.com/users/${idUser}/accounts`)
      .then(response => response.json())
      .then(
        (data) => this.setState({ accounts: [...data] }),
        (error) => console.log(error)
      )
  }

  render() {
    const { accounts } = this.state;
    const data = accounts.map((account: any, index: any) => {
      account.attributes.key = index;
      return account.attributes;
    })
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Balance',
        dataIndex: 'balance',
        key: 'balance'
      }
    ]
    return (
      <Table dataSource={data} columns={columns} pagination={false} bordered />
    )
  }
}

export default AccountList;
