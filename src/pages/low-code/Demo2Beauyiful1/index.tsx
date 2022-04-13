import React, { CSSProperties, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";

type Item = {
  id: string;
  content: string;
};

const grid = 8;
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "#666",
  padding: grid,
  width: 250,
});

const getItemStyle = (isDragging, draggableStyle): CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  // userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "#fff",
  ...draggableStyle,
});

const getGroupIndex = ({ destination, source }: DropResult) => {
  const sourceIndex = +source.droppableId.split("-")[1]; // 拖动的
  const destinationIndex = +destination.droppableId.split("-")[1]; // 目标值
  return [sourceIndex, destinationIndex];
};

const getGroupList = (
  cols: number = 1,
  { offSet = 0, count = 10 } = {}
): Item[][] => {
  const res = [];

  for (let i = 0; i < cols; i++) {
    const list: Item[] = [];

    for (let j = 0; j < count; j++) {
      list.push({
        id: `${j + (i + offSet) * 10}`,
        content: `item - ${j + (i + offSet) * 10}`,
      });
    }
    res.push(list);
  }

  return res;
};

export default function Demo2() {
  const [items, setItems] = useState(getGroupList(5));

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, ...rest } = result;
    if (!destination) return;

    const [moveIndex, wrapIndex] = getGroupIndex(result);
    const [sourceItem] = items[moveIndex].splice(source.index, 1);
    items[wrapIndex].splice(destination.index, 0, sourceItem);
    setItems([...items]);
  };

  const addNewGroup = () => {
    setItems([
      ...items,
      ...getGroupList(1, {
        offSet: items.length,
        count: 1,
      }),
    ]);
  };

  const handleDelete = (groupIndex: number, listIndex: number) => {
    items[groupIndex].splice(listIndex, 1);
    setItems([...items])
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <button onClick={addNewGroup}>add new group</button>
      </div>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {items.map((itemList, index) => (
            <Droppable droppableId={`droppable-${index}`} key={index}>
              {(provided, { isDraggingOver }) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(isDraggingOver)}
                >
                  {itemList.map(({ id, content }, listIndex) => (
                    <Draggable draggableId={id} key={id} index={listIndex}>
                      {(
                        { innerRef, draggableProps, dragHandleProps },
                        { isDragging }
                      ) => (
                        <div
                          ref={innerRef}
                          {...draggableProps}
                          {...dragHandleProps}
                          style={getItemStyle(isDragging, draggableProps.style)}
                        >
                          {content}{" "}
                          <button
                            onClick={() => handleDelete(index, listIndex)}
                          >
                            删除
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
