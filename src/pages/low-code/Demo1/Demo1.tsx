import React from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MoveItem from "./MoveItem";
import Wrap from "./Wrap";

export default function Demo1() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          display: "flex",
        }}
      >
        <div>
          <Wrap name="容器A" allowedDropEffect="any" />
          <Wrap name="容器B" allowedDropEffect="copy" />
          <Wrap name="容器C" allowedDropEffect="delete" />
        </div>
        <div>
          <MoveItem name="ItemA" />
          <MoveItem name="ItemB" />
        </div>
      </div>
    </DndProvider>
  );
}
