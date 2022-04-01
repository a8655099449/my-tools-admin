import React from "react";
import { useDrop } from "react-dnd";
import MoveItem from "./MoveItem";
import Wrap from "./Wrap";

export default function Demo1() {
  return (
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
  );
}
