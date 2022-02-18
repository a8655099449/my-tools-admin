import { Popconfirm } from "@arco-design/web-react";
import { IconDelete, IconEdit } from "@arco-design/web-react/icon";
import React, { FC, ReactElement } from "react";
type handles = "add" | "edit" | "delete";
interface IProps {
  handles?: handles[];
  onEdit?(): void;
  onDelete?(): void;
}
const HandleList: FC<IProps> = ({
  handles = ["edit", "delete"],
  onDelete,
  onEdit,
}): ReactElement => {
  return (
    <span className="handle-list">
      {handles.includes("edit") && (
        <IconEdit
          style={{
            color: "rgb(var(--primary-6))",
            marginRight: 5,
          }}
          onClick={onEdit}
        />
      )}
      {handles.includes("delete") && (
        <Popconfirm title="是否确认删除？" onOk={onDelete}>
          <IconDelete style={{ color: "red" }} />
        </Popconfirm>
      )}
    </span>
  );
};

export default HandleList;
