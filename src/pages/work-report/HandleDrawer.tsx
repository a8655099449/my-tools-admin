import React, {
  ForwardRefRenderFunction,
  ReactElement,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { YYYY_DD_MM } from "@/config/const";
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  FormItemProps,
  Input,
  InputNumber,
  Select,
  Table,
} from "@arco-design/web-react";
import dayjs from "dayjs";
import projectOptions from "./defaultOptions";
import useForm from "@arco-design/web-react/es/Form/useForm";

export type HandleDrawerInstance = {
  show?(): void;
  edit?(item: WorkReportItem): void;
};
type IProps = {
  onAdd?(item: WorkReportItem): void;
  onEdit?(item: WorkReportItem): void;
};
const HandleDrawer: ForwardRefRenderFunction<HandleDrawerInstance, IProps> = (
  { onAdd, onEdit },
  ref
): ReactElement => {
  const { current } = useRef({ id: "" });
  const [mode, setMode] = useState<ModalHandleType>("add");

  useImperativeHandle(ref, () => ({
    show() {
      setModalShow(true);
    },
    handleAdd() {},
    edit(item: WorkReportItem) {
      setMode("edit");
      item.date = dayjs(item.date);
      item.week = dayjs(item.week).startOf("week");
      setModalShow(true);
      current.id = item.id;
      setTimeout(() => {
        form.setFieldsValue(item);
        setStartDate(item.week);
      }, 50);
    },
  }));
  const [startDate, setStartDate] = useState(dayjs().startOf("week"));
  const [form] = useForm<WorkReportItem>();
  const [modalShow, setModalShow] = useState(false);

  const publicProps: FormItemProps = {
    rules: [
      {
        message: "必选项",
        required: true,
      },
    ],
    required: true,
  };
  const close = () => {
    form.resetFields();
    setModalShow(false);
    setMode("add");
  };
  return (
    <Drawer
      visible={modalShow}
      onCancel={close}
      width={800}
      title={mode === "add" ? "添加" : "编辑"}
      onOk={() => {
        form.validate().then((res) => {
          res.date =
            typeof res.date === "string"
              ? res.date
              : res.date.format(YYYY_DD_MM);
          res.week = startDate.format(YYYY_DD_MM);
          res.projectName =
            projectOptions.find(({ value }) => value === res.project)?.label ||
            "";
          if (mode === "edit") {
            res.id = current.id;
            onEdit(res);
          } else {
            onAdd(res);
          }
          close();
        });
      }}
    >
      <Form<WorkReportItem>
        initialValues={{
          date: dayjs(),
          project: projectOptions[0].value,
          workTime: 3,
        }}
        form={form}
      >
        <Form.Item label="选择周" required>
          <DatePicker.WeekPicker
            onChange={(...e) => {
              const d = e[1].startOf("week");
              setStartDate(d);
            }}
            value={startDate}
          />
        </Form.Item>

        <Form.Item label="选择日期" field={`date`} {...publicProps}>
          <DatePicker
            dayStartOfWeek={1}
            disabledDate={(current) => {
              return (
                current.isBefore(startDate) ||
                current.isAfter(startDate.add(1, "week"))
              );
            }}
          />
        </Form.Item>

        <Form.Item label="项目" field={`project`} {...publicProps}>
          <Select
            // options=}
            options={projectOptions}
          />
        </Form.Item>
        <Form.Item label="工时" field={`workTime`} {...publicProps}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="工作内容" field={`content`} {...publicProps}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
export default React.forwardRef(HandleDrawer);
