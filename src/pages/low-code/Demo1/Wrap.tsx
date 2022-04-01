import React from "react";
import { useDrop } from "react-dnd";

export default function Wrap({ name, allowedDropEffect }) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "box",
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop: () => ({ name  , allowedDropEffect}),
    }),
    [allowedDropEffect]
  );

  console.log(`isMove:`, canDrop);

  let backgroundColor = "#fff";

  if (canDrop) {
    backgroundColor = "blue";
  }
  if (isOver) {
    backgroundColor = "green";
  }

  return (
    <div
      ref={drop}
      style={{
        width: 200,
        height: 200,
        border: "1px solid #000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        marginBottom: 10,
      }}
    >
      {name}
    </div>
  );
}
