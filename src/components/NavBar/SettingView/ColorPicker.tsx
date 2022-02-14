import { getContext } from "@/context/BaseContext";
import { Button, Drawer, DrawerProps, Trigger } from "@arco-design/web-react";
import React, { FC, ReactElement } from "react";
import { SketchPicker } from "react-color";
import { generate, getRgbStr } from "@arco-design/color";
import useStorage from "@/utils/useStorage";

import styles from "../index.module.less";
import Block from "./Block";

interface IProps {}
const ColorPicker: FC<IProps> = (): ReactElement => {
  const { setting, setSetting } = getContext();
  const { themeColor } = setting;

  const list = generate(themeColor, { list: true });
  return (
    <Block title="主题颜色">
      <Trigger
        popup={() => (
          <SketchPicker
            color={themeColor}
            onChangeComplete={(e) => {
              const newColor = e.hex;
              setSetting({
                ...setting,
                themeColor: newColor,
              });
            }}
          />
        )}
        trigger="hover"
      >
        <div className={`${styles["color-bar"]}`}>
          <div
            style={{
              backgroundColor: themeColor,
            }}
          ></div>
          <div>{themeColor}</div>
        </div>
      </Trigger>

      <ul className={`${styles["color-list"]}`}>
        {list.map((color: string) => (
          <li key={color} style={{ backgroundColor: color }} />
        ))}
      </ul>
    </Block>
  );
};

export default ColorPicker;
