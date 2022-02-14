
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
2. 在`config/routes.ts`文件里，最下方增加配置

```js
const routes = [
  ...,
  {
    name:'profileA',
    key:'list'
  }
]
```



 **route参数说明**

|  api   | 说明                                          | 是否必须 |类型|
| :----: | --------------------------------------------- | -------- |-- |
| `name` | 页面的名字，同时也会会作为左侧菜单的名字      | 是       | string| 
| `key`  | key值是组件路径的位置，同时也会做为路由的`path` ,一个`pages/list/index.tsx`的组件，key值就是`list`。页面中的path就是`/list` ，key值作为路由的关键参数，建议不要重复，否则难以保证不会出现奇怪的问题 | 是 | string|
| `children`  | 子菜单，使用这个属性之后将会在菜单中生成子菜单， | 否 |route[] |
| `hideInMenu`  | 设置为`true`后不会在左侧菜单中显示 | 否 |boolean|
| `icon`  | 菜单的图标  | 否 | string |
| `auth`  | 权限配置 | 否 | string[]   |


## 状态管理

此项目中使用React原生的[`context`](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext)来做全局的状态管理。


组件的路径：`src\context\BaseContext\index.tsx`

可以在项目的任何组件中使用方法`getContext`来**获取或者设置**全局的状态

默认配置了以下的状态参数



|  参数名   | 说明                                          |
| :----: | --------------------------------------------- |
| userInfo | 当前登录用户 |
| setUserInfo | 设置当前登录的用户 |
| setting | 项目配置 （主题颜色 、 夜间模式等等）[setting](#setting参数说明) |
| setSetting | 设置项目配置 |
| currentRoute | 当前的路由 |

### setting参数说明

|  参数名   | 说明      | 类型 |
| :----: | --------------- | --- |
| `collapsed` | 是否展开侧边栏 | boolean |
| `theme` | 日间模式 / 夜间模式 |`dark` | `light` |
| `themeColor` | 日间模式 / 夜间模式 |`dark` | `light` |
| `lang` | 日间模式 / 夜间模式 |`zh-CN` | `en-US` |