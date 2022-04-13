const routes: RouteItem[] = [
  {
    component: "@/pages/home",
    key: `home`,
    name: "首页",
  },

  {
    name: "图片压缩",
    key: "tiny-image",
  },

  {
    name: "文字转语音",
    key: "text2voice",
  },
  {
    name: "excel转json",
    key: "excel2json",
  },
  {
    name: "useRequest",
    key: "hooks",
  },
  {
    name: "周报填写",
    key: "work-report",
  },
  {
    name: "拖拽demo",
    key: "low-code",
  },
  {
    name: "其他工具",
    key: "rest-tool",
    children: [
      {
        name: "类型转换",
        key: "rest-tool/to-type",
      },
    ],
  },
];

export default routes;
