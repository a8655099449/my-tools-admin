import { wait } from "@/utils";
import { Button } from "@arco-design/web-react";
import React, { FC, ReactElement } from "react";
import DatePickerWeek from "./DatePickerWeek";
import useRequest from "./useRequest";
// import { useRequest } from "ahooks";

interface IProps {}
const Hooks: FC<IProps> = (): ReactElement => {
  const { data, loading, run  } = useRequest(
    async () => {
      await wait();
      return 1000;
    },
    {
      initData: 500,
    }
  );
  return (
    <div>
      <Button loading={loading} onClick={run}>
        请求 {data}
      </Button>
      <DatePickerWeek/>
    </div>
  );
};

export default Hooks;
