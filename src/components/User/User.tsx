import React from "react";
import {Table} from "antd";
import {ColumnProps} from "antd/lib/table";
import {Link} from "react-router-dom";

interface UserState {
  userData: any
}

class User extends React.Component<any, UserState> {
  constructor(props: any) {
    super(props);
    this.state = {
      userData: {
        key: 1,
        name: "",
        account_ids: []
      }
    }
  }

  componentDidMount() {
    const idUser = this.props.match?.params.id;
    if (!idUser) return;
    fetch(`https://sample-accounts-api.herokuapp.com/users/${idUser}`)
      .then(response => response.json())
      .then(
        (data) => this.setState({ userData: {...data.attributes}}),
        (error) => console.log(error)
      )
  }

  render() {
    const { userData } = this.state;
    const columns: ColumnProps<any>[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (name: any, record: any) => {
          return (
            <Link to={`/user/${record.id}/accounts`}>{name}</Link>
          );
        }
      },
      {
        title: 'Accounts',
        dataIndex: 'account_ids',
        key: 'accounts',
        align: 'center',
        className: 'account-row-wrap',
        render: (data: any) => {
          return data.map((row: any) => {
            return <div className="account-row">{row}</div>;
          });
        }
      }
    ]

    return (
      <Table dataSource={[userData]} columns={columns} pagination={false} bordered  />
    );
  }
}

export default User;
