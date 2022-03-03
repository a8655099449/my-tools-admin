import HandleList from "@/components/HandleList/HandleList";
import { YYYY_DD_MM } from "@/config/const";
import { PROJECT_OPTIONS, WORK_REPORT_DB } from "@/config/localKeys";
import { uuid } from "@/utils";
import useStorage from "@/utils/useStorage";
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Table,
} from "@arco-design/web-react";
import { IconDelete, IconEdit } from "@arco-design/web-react/icon";
import dayjs from "dayjs";
import React, { FC, ReactElement, useMemo, useRef, useState } from "react";
import projectOptions from "./defaultOptions";
import EditProject from "./EditProject";
import HandleDrawer, { HandleDrawerInstance } from "./HandleDrawer";
import ReportDrawer from "./ReportDrawer";

export const weekMap = {
  1: "星期一",
  2: "星期二",
  3: "星期三",
  4: "星期四",
  5: "星期五",
  6: "星期六",
  0: "星期日",
};

interface IProps {}
const WorkReport: FC<IProps> = (): ReactElement => {
  const [data, setData] = useStorage<WorkReportItem[]>(WORK_REPORT_DB, []);
  const [drawerShow, setDraShow] = useState(false);
  const [projects, setProjects] = useStorage(PROJECT_OPTIONS, projectOptions);

  const drawer = useRef<HandleDrawerInstance>({ show() {}, edit() {} });
  const [filterValue, setFilterValue] = useState({
    week: dayjs().startOf("week"),
  });

  const handleChangeFilterValue = (key: string, value: any) => {
    const _filterValue = { ...filterValue };
    _filterValue[key] = value;
    setFilterValue(_filterValue);
  };
  const filterData = useMemo(() => {
    return data
      .filter((item) => {
        if (filterValue.week) {
          const _week = filterValue.week.format(YYYY_DD_MM);
          return item.week === _week;
        }
        return true;
      })
      .sort((a, b) => {
        const _a = dayjs(a.date).unix();
        const _b = dayjs(b.date).unix();
        return _a - _b;
      });
  }, [data, filterValue]);

  return (
    <div>
      <HandleDrawer
        ref={drawer}
        projects={projects}
        onAdd={(e) => {
          if (!e.id) e.id = uuid(16);
          setData([...data, e]);
        }}
        onEdit={(e) => {
          const _d = [...data];
          const fi = _d.findIndex(({ id }) => id === e.id);
          if (fi >= 0) {
            _d[fi] = e;
            setData([..._d]);
          }
        }}
      />

      <ReportDrawer
        visible={drawerShow}
        onCancel={() => {
          setDraShow(false);
        }}
        data={filterData}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button
            type="primary"
            className={`mr-10`}
            onClick={() => {
              setDraShow(true);
            }}
          >
            生成报告
          </Button>
          <EditProject projects={projects} setProjects={setProjects} />
        </div>
        <Button onClick={() => drawer.current?.show()} type="primary">
          新增
        </Button>
      </div>

      <div style={{ marginTop: 10 }}>
        <DatePicker.WeekPicker
          value={filterValue.week}
          onChange={(e, d) => {
            handleChangeFilterValue("week", e ? d.startOf("week") : e);
          }}
        />
      </div>
      <Table<WorkReportItem>
        data={filterData}
        style={{
          marginTop: 10,
        }}
        rowKey={`id`}
        columns={[
          {
            title: "项目",
            dataIndex: "projectName",
          },
          {
            title: "用时",
            dataIndex: "workTime",
          },
          {
            title: "内容",
            dataIndex: "content",
            width: 200,
          },
          {
            title: "周",
            dataIndex: "week",
          },
          {
            title: "日期",
            dataIndex: "date",
            render(date) {
              return `${date} (  ${weekMap[dayjs(date).format("d")]})`;
            },
          },
          {
            title: "操作",
            render(_, item) {
              return (
                <HandleList
                  onEdit={() => {
                    drawer.current.edit(item);
                  }}
                  onDelete={() => {
                    const i = data.findIndex(({ id }) => id === item.id);

                    data.splice(i, 1);
                    setData([...data]);
                  }}
                />
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default WorkReport;
