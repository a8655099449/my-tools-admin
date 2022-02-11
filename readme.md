
## 启动项目

```
npm i
npm run dev
```



## 项目说明


本项目主要使用的技术栈为 `arco(ui框架)` 和 `vite(脚手架)` 没有其他黑盒的内容，只需要掌握react和ts即可使用 ，任何的配置都可以在对应的组件文件中找到，我


### 路由配置

如果要新增一个页面，需要在`pages`下新增一个文件夹，

比如我要增加一个 list的页面

1. 新建文件`pages/list/index.tsx`
2. 在`config/routes.ts`文件里，最下方最佳配置

```js
const routes = [
  ...,
  {
    name:'profileA',
    key:'list'
  }
]
```



 route参数说明

|  api   | 说明                                          | 是否必须 |
| :----: | --------------------------------------------- | -------- |
| `name` | 页面的名字，同时也会会作为左侧菜单的名字      | 是       |
| `key`  | key值是组件路径的位置，同事也会最为路由`path` ,一个`pages/list/index.tsx`的组件，key值就是`list`。页面中的path就是`/list` | 是 |
| `children`  | 子菜单，使用这个属性之后将会在菜单中生成子菜单， | 否 |
| `hideInMenu`  | 设置为`true`后不会在左侧菜单中显示 | 否 |
| `icon`  | 菜单的图标 | 否 |











