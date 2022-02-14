import { ConfigProvider } from "@arco-design/web-react";
import React, { FC, ReactElement, useContext, createContext } from "react";
import useSetting, { UseSetting } from "./useSetting";
import zhCN from "@arco-design/web-react/es/locale/zh-CN";
import enUS from "@arco-design/web-react/es/locale/en-US";
import { UserHooks, userHooks } from "./useUserInfo";
import { TUseRoutes, useRoutes } from "./useRoute";
export type CtxProps = UseSetting & UserHooks & TUseRoutes;
// @ts-ignore
const Context = createContext<CtxProps>({});

export const getContext = (): CtxProps => useContext(Context);

interface IProps {}
const BaseContext: FC<IProps> = ({ children }): ReactElement => {
  const p = useSetting();
  const lang = p.setting.lang;
  const u = userHooks();

  const r = useRoutes();

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
    <Context.Provider value={{ ...p, ...u, ...r }}>
      <ConfigProvider locale={getArcoLocale()}>{children}</ConfigProvider>
    </Context.Provider>
  );
};

export default BaseContext;
