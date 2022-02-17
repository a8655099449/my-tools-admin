import { Form, Input } from "@arco-design/web-react";

import React, { FC, ReactElement } from "react";

import styles from './a.module.less';

interface IProps {}
const FormTest: FC<IProps> = (): ReactElement => {
  let form = Form.useForm();

  return (
    <div>
      <button
        onClick={() => {
      
        }}
      >
        点击
      </button>
      {/* <ProTable /> */}
      <div className="a">

      </div>
      <Form form={form[0]} >
        <Form.Item field="ssss">
          <Input />
        </Form.Item>
      </Form>
      <Form>
        <Form.Item field="ssss">
          <Input />
        </Form.Item>
      </Form>
      <Form>
        <Form.Item field="ssss">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormTest;
