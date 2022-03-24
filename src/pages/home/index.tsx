import ErrorCatch from "@/components/ErrorCatch/index.js";
import lazyload from "@/components/lazyload";
import React, { FC, ReactElement, useEffect } from "react";

import "./test.js";

interface IProps {}
const index: FC<IProps> = (): ReactElement => {
  // const List =  lazyload(`./pages/list/index.tsx`)
  useEffect(()=>{
    // console.log('👴2022-03-22 11:13:36 index.tsx line:11',a)
  })

  return (
    <div>
      <h1>this is home</h1>
    </div>
  );
};

export default index;
