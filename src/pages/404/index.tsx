import { Button, Result } from "@arco-design/web-react";
import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

interface IProps {}
const Page404: FC<IProps> = (): ReactElement => {
  return (
    <div>
      <Result
        status="404"
        subTitle={`页面未找到`}
        extra={
          <Link replace to={`/`}>
            <Button key="back" type="primary">
              返回
            </Button>
          </Link>
        }
      />
    </div>
  );
};

export default Page404;
