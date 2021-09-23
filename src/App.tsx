import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, useParams} from "react-router-dom";
import './App.less';
import {Layout, Menu} from 'antd';
import User from "./components/User/User";
import AccountList from "./components/AccountList/AccountList";
import Search from "./components/Search/Search";
import Title from "antd/es/typography/Title";
import MenuItem from "antd/es/menu/MenuItem";
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function UserDetailPage() {
  const {id} = useParams<{id: string}>();
  return <Link to={`/user/${id}`}>User Detail</Link>
}

const App = () => {
  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Header>
          <Title level={2}>Account Management</Title>
        </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
          >
            <Menu theme="dark">
              <MenuItem icon={<SearchOutlined />}>
                <Link to="/">Account Search</Link>
              </MenuItem>
              <Switch>
                <Route path="/user/:id/accounts">
                  <MenuItem icon={<UserOutlined />}><UserDetailPage /></MenuItem>
                </Route>
              </Switch>
            </Menu>
          </Sider>
          <Content>
            <div className="site-layout-background" style={{ padding: '30px 10px', minHeight: 360 }}>
              <Switch>
                <Route path="/" component={Search} exact />
                <Route path="/user/:id" component={User} exact />
                <Route path="/user/:id/accounts" component={AccountList} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  )
}

export default App;
