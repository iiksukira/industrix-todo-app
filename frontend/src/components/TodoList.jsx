import React, { useContext, useState } from "react";
import {
  Table,
  Button,
  Tag,
  Input,
  Space,
  Popconfirm,
  Select,
  Row,
  Col,
} from "antd";
import api from "../api/api";
import { TodoContext } from "../context/todoContext";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const { todos, fetchTodos, loading, search, setSearch, pagination } =
    useContext(TodoContext);
  const [openForm, setOpenForm] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [limit, setLimit] = useState(50);

  const handleDelete = async (id) => {
    await api.delete(`/todos/${id}`);
    fetchTodos(pagination.current_page, search, limit);
  };

  const handleToggle = async (id) => {
    await api.patch(`/todos/${id}/complete`);
    fetchTodos(pagination.current_page, search, limit);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Category",
      render: (_, record) => {
        const categoryColorMap = {
          Personal: "blue",
          Work: "green",
          Other: "purple",
        };
        const categoryName = record.category?.name;
        const tagColor = categoryColorMap[categoryName] || "default";
        return categoryName ? <Tag color={tagColor}>{categoryName}</Tag> : "-";
      },
      responsive: ["sm"],
    },
    {
      title: "Priority",
      render: (record) => {
        const priorityColorMap = {
          high: "red",
          medium: "orange",
          low: "green",
        };
        const tagColor =
          priorityColorMap[record.priority?.toLowerCase()] || "default";
        return <Tag color={tagColor}>{record.priority}</Tag>;
      },
      responsive: ["md"],
    },
    {
      title: "Status",
      render: (record) =>
        record.completed ? (
          <Tag color="green">Completed</Tag>
        ) : (
          <Tag color="blue">Pending</Tag>
        ),
    },
    {
      title: "Actions",
      render: (record) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditTodo(record);
              setOpenForm(true);
            }}
          >
            View More & Edit
          </Button>
          <Button type="link" onClick={() => handleToggle(record.id)}>
            Mark
          </Button>
          <Popconfirm
            title="Delete this todo?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row
        gutter={[16, 16]}
        style={{ marginBottom: 16 }}
        justify="space-between"
        align="middle"
      >
        <Col xs={24} sm={12} md={8} lg={10}>
          <Input.Search
            placeholder="Search todos..."
            onSearch={(value) => {
              setSearch(value);
              fetchTodos(1, value, limit);
            }}
            enterButton
            allowClear
          />
        </Col>

        <Col xs={12} sm={6} md={4} lg={4}>
          <Select
            value={limit}
            onChange={(value) => {
              const numericLimit = Number(value);
              setLimit(numericLimit);
              fetchTodos(1, search, numericLimit);
            }}
            style={{ width: "100%" }}
            options={[
              { value: 10, label: "Show 10" },
              { value: 20, label: "Show 20" },
              { value: 50, label: "Show 50" },
              { value: 1000, label: "Show All" },
            ]}
          />
        </Col>

        <Col xs={12} sm={6} md={4} lg={4}>
          <Button
            type="primary"
            block
            onClick={() => {
              setEditTodo(null);
              setOpenForm(true);
            }}
          >
            + Add Todo
          </Button>
        </Col>
      </Row>

      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={todos}
          loading={loading}
          pagination={{
            current: pagination.current_page,
            pageSize: pagination.per_page,
            total: pagination.total,
            showSizeChanger: false,
            onChange: (page) => fetchTodos(page, search, limit),
          }}
          rowKey="id"
          scroll={{ x: "100%" }}
          style={{
            background: "#fff",
            borderRadius: 8,
          }}
        />
      </div>

      {pagination && (
        <div
          style={{
            marginTop: 16,
            padding: "8px 12px",
            background: "#fafafa",
            borderRadius: 8,
            fontSize: 14,
            color: "#555",
            textAlign: "right",
          }}
        >
          Showing <strong>{todos.length}</strong> of{" "}
          <strong>{pagination.total}</strong> todos
        </div>
      )}

      <TodoForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        editTodo={editTodo}
      />
    </>
  );
};

export default TodoList;
