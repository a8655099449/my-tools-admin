import HandleList from "@/components/HandleList/HandleList";
import { YYYY_DD_MM } from "@/config/const";
import { WORK_REPORT_DB } from "@/config/localKeys";
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
import React, { FC, ReactElement, useRef, useState } from "react";
import HandleDrawer, { HandleDrawerInstance } from "./HandleDrawer";

interface IProps {}
const WorkReport: FC<IProps> = (): ReactElement => {
  const [data, setData] = useStorage<WorkReportItem[]>(WORK_REPORT_DB, []);

  const drawer = useRef<HandleDrawerInstance>();
  const [filterValue, setFilterValue] = useState({
    week: dayjs().startOf("week"),
  });

  const handleChangeFilterValue = (key: string, value: any) => {
    const _filterValue = { ...filterValue };
    _filterValue[key] = value;
    setFilterValue(_filterValue);
  };

  return (
    <div>
      <HandleDrawer
        ref={drawer}
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
      <Button type="primary" onClick={(e) => drawer.current.show()}>
        新增
      </Button>
      <div style={{ marginTop: 10 }}>
        <DatePicker.WeekPicker
          value={filterValue.week}
          onChange={(e, d) => {
            handleChangeFilterValue("week", e ? d.startOf("week") : e);
          }}
        />
      </div>
      <Table<WorkReportItem>
        data={data.filter((item) => {
          // return  true;

          if (filterValue.week) {
            const _week = filterValue.week.format(YYYY_DD_MM);
            console.log("👴2022-02-18 18:00:08 index.tsx line:70", _week);
            return item.week === _week;
          }

          return true;
        })}
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
