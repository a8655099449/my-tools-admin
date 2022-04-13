import { Table } from "@arco-design/web-react";
import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

const getList = () =>
  Array.from({ length: 5 }).map((item, index) => ({
    name: `测试${index}`,
    id: `${index}`,
  }));

export default function Demo3() {
  const onDragEnd = (result: DropResult) => {
    const { destination } = result;
    if (!destination) return;
  };

  const [data, setData] = useState(getList());
  const Row = (props) => {
    const { index, record } = props;

    return (
      <Draggable index={index} draggableId={record.id}>
        {({ innerRef, draggableProps, dragHandleProps, ...rest }, res2) => {
          console.log("👴2022-04-07 17:07:59 index.tsx line:29", res2);
          return (
            <tr
              {...props}
              {...dragHandleProps}
              {...draggableProps}
              style={{ ...draggableProps.style, cursor: "move" }}
              ref={innerRef}
            />
          );
        }}
      </Draggable>
    );
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="table">
          {({ innerRef, droppableProps, placeholder, ...rest }, params) => {
            console.log("👴2022-04-07 17:03:54 index.tsx line:45", params);
            return (
              <div ref={innerRef} {...droppableProps}>
                <Table
                  data={data}
                  columns={[
                    {
                      dataIndex: "name",
                      title: "name",
                      key: "name",
                    },
                  ]}
                  components={{
                    body: {
                      row: Row,
                    },
                  }}
                  // pagePosition={false}
                  pagination={false}
                  rowKey="id"
                />
                {placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
