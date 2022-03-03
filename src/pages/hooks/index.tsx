import { wait } from "@/utils";
import { Button } from "@arco-design/web-react";
import React, { FC, ReactElement } from "react";
import DatePickerWeek from "./DatePickerWeek";
// import useRequest from "./useRequest";
import { useRequest } from "ahooks";

interface IProps {}
const Hooks: FC<IProps> = (): ReactElement => {
  const { data, loading, run } = useRequest(
    async (...p) => {
      await wait();
      return 1000;
    },
    {
      
      
    }
  );
  return (
    <div>
      <Button
        loading={loading}
        onClick={async () => {
          const res = await run(111);
          console.log("👴2022-02-23 10:42:24 index.tsx line:26", res);
        }}
      >
        请求 {data}
      </Button>
    </div>
  );
};

export default Hooks;
