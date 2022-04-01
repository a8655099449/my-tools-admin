import React, { FC, ReactElement } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Demo1 from "./Demo1/Demo1";
// import Demo1 from "./Demo1";

interface IProps {}
const LowCode: FC<IProps> = (): ReactElement => {
  return <DndProvider backend={HTML5Backend}>
    <Demo1 />

  </DndProvider>;
};

export default LowCode;
