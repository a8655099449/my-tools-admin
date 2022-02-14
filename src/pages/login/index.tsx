import { USER_INFO } from "@/config/localKeys";
import { getContext } from "@/context/BaseContext";
import useStorage from "@/utils/useStorage";
import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Icon,
  Input,
  Message,
} from "@arco-design/web-react";
import {
  IconClockCircle,
  IconLock,
  IconUser,
} from "@arco-design/web-react/icon";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

import styles from "./index.module.less";

export default function login() {
  // const form = useRef<FormInstance>();
  const [form] = Form.useForm<UserInfo>();
  const {replace} = useHistory()

  // const [localUser, setUser] = useStorage<UserInfo>(USER_INFO, {
  //   acc: "",
  //   pwd: "",
  //   remember: true,
  // });

  const {userInfo , setUserInfo} = getContext()


  const handleLogin = async () => {
    let value = await form.validate();

    if (value.acc === "admin") {
      value.auth = ["admin"];
    }
    setUserInfo(value);
    replace('/')
    Message.success('登录成功')

  };
  const required = true;
  return (
    <div className={`${styles["login"]}`}>
      <div className={`${styles["login-box"]}`}>
        <h1>Login</h1>
        <Form
          wrapperCol={{ span: 24 }}
          form={form}
          initialValues={userInfo.remember ? userInfo : {}}
        >
          <Form.Item
            field="acc"
            required
            rules={[
              {
                required,
                message: "账号格式错误",
                minLength: 5,
              },
            ]}
          >
            <Input
              type="text"
              placeholder="请输入账号"
              required
              prefix={<IconUser />}
            />
          </Form.Item>
          <Form.Item
            field="pwd"
            required
            rules={[
              {
                required,
                message: "密码格式错误",
                minLength: 6,
              },
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input.Password
              type="password"
              placeholder="请输入密码"
              required
              prefix={<IconLock />}
            />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 10 }}
            field="remember"
            itemType="checkbox"
            initialValue={true}
          >
            <Checkbox defaultChecked> 记住密码</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" long onClick={handleLogin}>
              login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
