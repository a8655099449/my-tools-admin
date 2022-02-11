import { Button, Drawer, DrawerProps, Trigger } from "@arco-design/web-react";
import React, { FC, ReactElement } from "react";

import styles from "../index.module.less";
import ColorPicker from "./ColorPicker";

const SettingView: FC<DrawerProps> = ({ ...restProps }): ReactElement => {
  return (
    <Drawer title="页面配置" {...restProps} width={400}>
      <div className={`${styles["setting"]}`}>
        <ColorPicker />
      </div>
    </Drawer>
  );
};

export default SettingView;
