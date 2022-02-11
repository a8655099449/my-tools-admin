import { Layout, Menu } from "@arco-design/web-react";
import React, {
  FC,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface IProps {}
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom";
import styles from "./layout.module.less";

const { Sider, Content } = Layout;
const { Item: MenuItem, SubMenu } = Menu;
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
} from "@arco-design/web-react/icon";
import routes from "../config/routes";
import getFlattenRoutes from "./loadRoute";
import NavBar from "@/components/NavBar";
import BaseContext, { getContext } from "./components/BaseContext";

const isArray = Array.isArray;
function getIconFromKey(key) {
  switch (key) {
    case "home":
      return <IconDashboard />;
    case "list":
      return <IconList />;
    case "form":
      return <IconSettings />;
    case "profile":
      return <IconFile />;
    case "visualization":
      return <IconApps />;
    case "result":
      return <IconCheckCircle />;
    case "exception":
      return <IconExclamationCircle />;
    case "user":
      return <IconUser />;
    default:
      return <IconUser />;
  }
}

const BaseLayout: FC<IProps> = (): ReactElement => {
  const _routes = useMemo<RouteItem[]>(() => {
    return getFlattenRoutes(routes);
  }, []);
  const { pathname } = useLocation();

  const routeMap = useRef<Map<string, React.ReactNode[]>>(new Map());
  const [menuKey, setMenuKey] = useState(pathname);
  // const [collapsed, setCollapsed] = useState(false);
  const { setting, setSetting } = getContext();
  const { collapsed } = setting;

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const _key = pathname.replace(/^\//, "");
    setSelectedKeys([_key]);
  }, [pathname]);

  function renderRoutes() {
    routeMap.current.clear();
    const nodes: any[] = [];
    function travel(_routes, level, parentNode: any[] = []) {
      return _routes.map((route) => {
        const { breadcrumb = true } = route;
        const iconDom = getIconFromKey(route.key);
        const titleDom = (
          <>
            {iconDom} {route.name}
          </>
        );
        if (
          route.component &&
          (!isArray(route.children) ||
            (isArray(route.children) && !route.children.length))
        ) {
          routeMap.current.set(
            `/${route.key}`,
            breadcrumb ? [...parentNode, route.name] : []
          );

          if (level > 1) {
            return (
              <MenuItem key={route.key}>
                <Link to={`/${route.key}`}>{titleDom}</Link>
              </MenuItem>
            );
          }
          nodes.push(
            <MenuItem key={route.key}>
              <Link to={`/${route.key}`}>{titleDom}</Link>
            </MenuItem>
          );
        }
        if (isArray(route.children) && route.children.length) {
          const parentNode: any[] = [];
          if (iconDom.props.isIcon) {
            parentNode.push(iconDom);
          }

          if (level > 1) {
            return (
              <SubMenu key={route.key} title={titleDom}>
                {travel(route.children, level + 1, [...parentNode, route.name])}
              </SubMenu>
            );
          }
          nodes.push(
            <SubMenu key={route.key} title={titleDom}>
              {travel(route.children, level + 1, [...parentNode, route.name])}
            </SubMenu>
          );
        }
      });
    }
    travel(routes, 1);
    return nodes;
  }
  return (
    <>
      <NavBar />
      <Layout className={`${styles["layout"]}`}>
        {/* <SideBar routes={routes} /> */}
        <Sider collapsed={collapsed} className={`${styles["sider"]}`}>
          <Menu
            openKeys={openKeys}
            collapse={collapsed}
            onClickSubMenu={(key, openKeys) => {
              // console.log("👴2022-02-09 16:14:15 index.tsx line:124", p);
              setOpenKeys(openKeys);
            }}
            selectedKeys={selectedKeys}
          >
            {renderRoutes()}
          </Menu>
          <div
            className={`${styles["collapsed-btn"]}`}
            onClick={() => setSetting({ ...setting, collapsed: !collapsed })}
          >
            {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
          </div>
        </Sider>

        <Content
          style={{
            backgroundColor: `var(--color-bg-3)`,
            padding:10
          }}
        >
          <Switch>
            {_routes.map(({ component, key }) => {
              return <Route key={key} path={`/${key}`} component={component} />;
            })}
          </Switch>
        </Content>
      </Layout>
    </>
  );
};

export default BaseLayout;
