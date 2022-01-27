import { Layout, Menu } from "@arco-design/web-react";
import React, { FC, ReactElement } from "react";

interface IProps {}




const { Sider, Content } = Layout;
const { Item } = Menu;
import {
  IconDashboard,
  IconList,
  IconSettings,
  IconFile,
  IconApps,
  IconCheckCircle,
  IconExclamationCircle,
  IconUser,
  IconMenuFold,
  IconMenuUnfold,
} from '@arco-design/web-react/icon';
import routes from "../config/routes";
const BaseLayout: FC<IProps> = ({ children }): ReactElement => {
  return (
    <Layout
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Sider>
        <Menu>
          <Item key="aa">
            <IconApps />
            菜单1 </Item>
          <Item key="a2">菜单2 </Item>
        </Menu>
      </Sider>
      <Content>内容栏</Content>
    </Layout>
  );
};

export default BaseLayout;
