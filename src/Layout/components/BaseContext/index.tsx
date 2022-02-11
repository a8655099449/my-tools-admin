import { ConfigProvider } from "@arco-design/web-react";
import React, { FC, ReactElement, useContext, createContext } from "react";
import useSetting, { UseSetting } from "./useSetting";
import zhCN from "@arco-design/web-react/es/locale/zh-CN";
import enUS from "@arco-design/web-react/es/locale/en-US";
export type CtxProps = UseSetting;
// @ts-ignore
const Context = createContext<CtxProps>({});

export const getContext = (): CtxProps => useContext(Context);

interface IProps {}
const BaseContext: FC<IProps> = ({ children }): ReactElement => {
  const p = useSetting();
  const lang = p.setting.lang;

  function getArcoLocale() {
    switch (lang) {
      case "zh-CN":
        return zhCN;
      case "en-US":
        return enUS;
      default:
        return zhCN;
    }
  }

  return (
    <Context.Provider value={{ ...p }}>
      <ConfigProvider locale={getArcoLocale()}>{children}</ConfigProvider>
    </Context.Provider>
  );
};

export default BaseContext;
