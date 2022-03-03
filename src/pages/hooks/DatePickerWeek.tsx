import { DatePicker, Form } from "@arco-design/web-react";
import React from "react";

export default function DatePickerWeek() {
  return (
    <Form>
      <Form.Item label="选择周" required field={`aaa`}>
        <DatePicker.WeekPicker />
      </Form.Item>
    </Form>
  );
}
