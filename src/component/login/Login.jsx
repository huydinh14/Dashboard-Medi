import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, Button, Form, Input, Modal } from "antd";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/features/userSlice";
import "./login.css";

const Login = ({ visible, onModalCancel}) => {
  const [isLoginRequesting, setIsLoginRequesting] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setErrorMessage(undefined);
      setIsLoginRequesting(true);
      const { response, error } = await userApi.signin(values);
      setIsLoginRequesting(false);
      if (response) {
        dispatch(setUser(response));
        form.resetFields();
        onModalCancel();
      }
      if (error) {
        setErrorMessage(error.message);
      }
    } catch (error) {}
  };
  return (
    <div>
      <Modal title="Login" open={visible} footer={null}>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
              {
                min: 8,
                message: "Username must be at least 6 characters",
              },
            ]}
          >
            <Input
              autoComplete="username"
              prefix={<i className="bx bx-user"></i>}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                min: 8,
                message: "Password must be at least 6 characters",
              },
            ]}
          >
            <Input
              autoComplete="on"
              prefix={<i className="bx bxs-lock"></i>}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button
              htmlType="submit"
              className="login-form-button"
              loading={isLoginRequesting}
            >
              Log in
            </Button>
            <br />
            Or <a href="/">register now!</a>
          </Form.Item>
          {errorMessage && (
            <Form.Item>
              <Alert message={errorMessage} type="error" showIcon closable />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
