import React from "react";
import { Layout, Typography } from "antd";
import TodoList from "../components/TodoList";

const { Header, Content } = Layout;

const Home = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Typography.Title level={3} style={{ color: "#fff", margin: 15 }}>
          Industrix Todo List
        </Typography.Title>
      </Header>
      <Content style={{ padding: "20px", maxWidth: 1000, margin: "0 auto" }}>
        <TodoList />
      </Content>
    </Layout>
  );
};

export default Home;
