const routes: RouteItem[] = [
  {
    path: "/home",
    component: "@/pages/home",
    key: `home`,
    name: "首页",
  },
  {
    path: "/list",
    key: `list`,
    name: "列表",
    children: [
      {
        path: "/list/list1",
        name: "列表1",
        key:'list/list1',
        children:[
          {
            name:'list2',
            key:'list/list1/list2'
          },
          {
            name:"list",
            key:'list'
          }
        ]
      },
    ],
  },

  {
    name:'profileA',
    key:'profile/a'
  },
  {
    name:'profileB',
    key:'profile/b'
  },
  
];

export default routes;
