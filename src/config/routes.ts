const routes: RouteItem[] = [
  {
    component: "@/pages/home",
    key: `home`,
    name: "首页",
  },
  {
    key: `list`,
    name: "列表",
    children: [
      {
        path: "/list/list1",
        name: "列表1",
        key: "list/list1",
        children: [
          {
            name: "list2",
            key: "list/list1/list2",
          },
          {
            name: "list",
            key: "list",
          },
        ],
      },
      {
        name: "动态路由",
        hideInMenu: true,
        key: "list/listDetail",
        path: "/list/listDetail/:id",
        // auth: ["admin"],
      },
    ],
  },
  {
    name: "动态路由",
    key: "profile/a",
  },
  {
    name: "权限控制",
    key: "profile/b",
    auth: ["admin"],
  },
];

export default routes;
