import { getContext } from "@/context/BaseContext";
import { Result } from "@arco-design/web-react";
import React, { FC, ReactElement } from "react";

interface IProps {}
const Auth: FC<IProps> = ({ children }): ReactElement => {
  const { currentRoute, userInfo } = getContext();

  const { auth } = userInfo;

  if (
    currentRoute?.auth &&
    !currentRoute.auth.some((item) => auth?.includes(item))
  ) {
    return <Result status={`500`} subTitle="没有访问权限" 
   
    
    />;
  }

  return <>{children}</>;
};

export default Auth;
