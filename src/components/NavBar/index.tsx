import { getContext } from "@/Layout/components/BaseContext";
import { Select } from "@arco-design/web-react";
import {
  IconLanguage,
  IconMoonFill,
  IconSettings,
  IconSunFill,
} from "@arco-design/web-react/icon";
import React, { FC, ReactElement, useState } from "react";
import logo from "../../logo.svg";
import IconButton from "../IconButton";
import styles from "./index.module.less";
import SettingView from "./SettingView";

interface IProps {}
const NavBar: FC<IProps> = (): ReactElement => {
  const [settingViewShow, settingSetViewShow] = useState(false);

  const { setting, setSetting } = getContext();
  const { theme } = setting;
  const isDark = theme !== "dark";
  // console.log('👴2022-02-11 11:37:57 index.tsx line:22',isDark)

  return (
    <div className={`${styles["navbar"]}`}>
      <SettingView
        visible={settingViewShow}
        onCancel={() => settingSetViewShow(false)}
        onOk={() => settingSetViewShow(false)}
      />
      <div className={`${styles["logo"]}`}>
        <img src={logo} alt="" />
        vite-react-admin
      </div>
      <div className={`${styles["right-bar"]}`}>
        <IconButton
          icon={isDark ? <IconMoonFill /> : <IconSunFill />}
          onClick={(e) => {
            const theme = !isDark ? "light" : "dark";
            setSetting({
              ...setting,
              theme,
            });
          }}
          className="mr-10"
        />
        <Select
          triggerElement={
            <IconButton
              icon={<IconLanguage />}
              style={{
                marginRight: 10,
              }}
            />
          }
          options={[
            { label: "中文", value: "zh-CN" },
            { label: "English", value: "en-US" },
          ]}
          trigger="hover"
          triggerProps={{
            autoAlignPopupWidth: false,
            autoAlignPopupMinWidth: true,
            position: "br",
          }}
          value={setting.lang}
          onChange={(e) => {
            setSetting({ ...setting, lang: e });
          }}
        />

        <IconButton
          icon={<IconSettings />}
          onClick={() => settingSetViewShow(true)}
        />
      </div>
    </div>
  );
};

export default NavBar;
