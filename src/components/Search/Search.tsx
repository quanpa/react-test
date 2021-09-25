import React from "react";
import {Button, Input, message, Space} from "antd";
import {Redirect} from "react-router-dom";

interface SearchProps {}
interface SearchState {
  idUser: string,
  redirect: boolean,
}

class Search extends React.Component<SearchProps,SearchState> {
  constructor(props: any) {
    super(props);
    this.state = {
      idUser: "",
      redirect: false,
    }
  }

  errorMessage = async () => {
    await message.error('Not found user!');
  };

  handleClickButton() {
    fetch(`https://sample-accounts-api.herokuapp.com/users/${this.state.idUser}`)
      .then(response => response.json())
      .then(() => this.setState({ redirect: true }))
      .catch(() => this.errorMessage());
  }

  render() {
    const { redirect, idUser } = this.state;
    if (redirect) {
      return <Redirect to={`/user/${idUser}/accounts`} />
    }
    return (
      <Space>
        <Input className="account-search-input" type="number" value={idUser} onChange={(e) => this.setState({idUser: e.target.value})} placeholder="Please enter User ID" />
        <Button type="primary" disabled={idUser === ""} onClick={() => this.handleClickButton()}>Submit</Button>
      </Space>
    )
  }
}

export default Search
