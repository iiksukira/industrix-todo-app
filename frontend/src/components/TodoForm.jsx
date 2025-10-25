import React, { useContext, useState } from "react";
import {
  Modal,
  Drawer,
  Form,
  Input,
  Select,
  Button,
  Grid,
  Row,
  Col,
} from "antd";
import api from "../api/api";
import { TodoContext } from "../context/todoContext";

const { useBreakpoint } = Grid;

const TodoForm = ({ open, onClose, editTodo }) => {
  const { fetchTodos, categories } = useContext(TodoContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const screens = useBreakpoint();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      if (editTodo) {
        await api.put(`/todos/${editTodo.id}`, values);
      } else {
        await api.post("/todos", values);
      }
      fetchTodos();
      onClose();
      form.resetFields();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const FormContent = (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={editTodo || { priority: "medium" }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Enter todo title" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item name="category_id" label="Category">
            <Select placeholder="Select category">
              {categories.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Priority" style={{ marginBottom: 0 }}>
            <Row gutter={[8, 8]}>
              <Col xs={16} sm={18}>
                <Form.Item
                  name="priority"
                  noStyle
                  rules={[
                    { required: true, message: "Please select priority" },
                  ]}
                >
                  <Select
                    placeholder="Select priority"
                    style={{ width: "100%", height: 40 }}
                    options={[
                      { value: "high", label: "High" },
                      { value: "medium", label: "Medium" },
                      { value: "low", label: "Low" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={8} sm={6}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  style={{ height: 40 }}
                >
                  {editTodo ? "Update" : "Add"}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return screens.md ? (
    <Modal
      title={editTodo ? "Edit Todo" : "Add Todo"}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
    >
      {FormContent}
    </Modal>
  ) : (
    <Drawer
      title={editTodo ? "Edit Todo" : "Add Todo"}
      open={open}
      onClose={onClose}
      placement="bottom"
      height="85%"
      bodyStyle={{ padding: "16px" }}
      destroyOnClose
    >
      {FormContent}
    </Drawer>
  );
};

export default TodoForm;
