import { Message } from "@arco-design/web-react";
import React from "react";
import { useDrag } from "react-dnd";

export default function MoveItem({ name = "ItemA" }) {
  const [
    { isDragging, canDrag, itemType, didDrop, item, dropResult, offset },
    drag,
  ] = useDrag(
    () => ({
      type: "box",
      item: { name, type: "555" },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(), // 开始拖拽
        canDrag: monitor.canDrag(), // 是否能够被拖拽
        itemType: monitor.getItemType(), // 在移动中的 type
        item: monitor.getItem(), // 正在移动中的 item属性
        didDrop: monitor.didDrop(), // 准备松开
        dropResult: monitor.getDropResult(), // 准备松开
        offset: monitor.getInitialSourceClientOffset(), // 准备松开
      }),
      end(item, monitor) {
        const dropResult = monitor.getDropResult<{ name: string }>();
        console.log("👴2022-04-01 17:49:48 MoveItem.tsx line:23", dropResult);
        if (item && dropResult) {
          Message.success(`${item.name} 移动到了 ${dropResult?.name} 里面`);
        }
      },
    }),
    [name]
  );

  // console.log("👴isDragging", item);
  // console.log("👴didDrop", offset);

  return (
    <div
      ref={drag}
      style={{
        padding: 10,
        border: "1px solid #666",
        margin: 10,
        visibility: isDragging ? "hidden" : "visible",
      }}
    >
      MoveItem {name}
    </div>
  );
}
