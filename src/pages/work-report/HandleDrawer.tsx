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
  Tag,
} from "@arco-design/web-react";
import dayjs from "dayjs";
import projectOptions from "./defaultOptions";
import useForm from "@arco-design/web-react/es/Form/useForm";
import useStorage from "@/utils/useStorage";
import { HISTORY_SELECT_PROJECT, PROJECT_OPTIONS } from "@/config/localKeys";

export type HandleDrawerInstance = {
  show(): void;
  edit(item: WorkReportItem): void;
};
type IProps = {
  onAdd?(item: WorkReportItem): void;
  onEdit?(item: WorkReportItem): void;
  projects: Option[];
};
const HandleDrawer: ForwardRefRenderFunction<HandleDrawerInstance, IProps> = (
  { onAdd, onEdit, projects },
  ref
): ReactElement => {
  const { current } = useRef({ id: "" });
  const [mode, setMode] = useState<ModalHandleType>("add");

  const [historySelectList, setHistorySelectList] = useStorage<Option[]>(
    HISTORY_SELECT_PROJECT,
    []
  );

  const addHistorySelectList = (item: Option) => {
    // 先去重
    const _historySelectList = historySelectList.filter(
      ({ value }) => item.value !== value
    );
  


    setHistorySelectList([item, ..._historySelectList]);
  };

  // const  [ops , setOps] = useStorage(PROJECT_OPTIONS , projectOptions)

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
          const finder = projects.find(({ value }) => value === res.project);

          res.projectName = finder?.label || "";
          if (mode === "edit") {
            res.id = current.id;
            onEdit?.(res);
          } else {
            onAdd?.(res);
            finder && addHistorySelectList(finder);
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
          content: "",
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
                current?.isBefore(startDate) ||
                current?.isAfter(startDate.add(1, "week")) ||
                false
              );
            }}
          />
        </Form.Item>

        <Form.Item label="项目" field={`project`} {...publicProps}>
          <Select
            // options=}
            showSearch
            onInputValueChange={(e) => {
              console.log("👴2022-03-03 13:42:16 HandleDrawer.tsx line:138", e);
            }}
            options={projects}
          />
        </Form.Item>
        <Form.Item label="历史选项">
          <div>
            {historySelectList.map(({ label, value }) => {
              return (
                <Tag
                  key={value}
                  color={`green`}
                  bordered
                  style={{ marginRight: 5, cursor: "pointer" }}
                  onClick={(e) => {
                    form.setFieldValue(`project`, value);
                  }}
                >
                  {label}
                </Tag>
              );
            })}
          </div>
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
