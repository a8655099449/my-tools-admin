import { Table } from "@arco-design/web-react";
import React, { FC, ReactElement } from "react";

interface IProps {}
const table: FC<IProps> = (): ReactElement => {
  return (
    <div>
      表格页面
      <Table
        data={[
          {
            name: "张三",
            age: "18",
          },
        ]}
        columns={[
          {
            dataIndex: "name",
            title: "name",
          },
        ]}
      />
    </div>
  );
};

export default table;
