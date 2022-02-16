
## 启动项目

```
npm i
npm run dev
```


[项目预览地址](http://vite-admin.woai996.com/)

**设计的目的**

以最少的依赖和简单的方式。完成一个后台初始模板的搭建。所有的组件都在项目中可以找到，以便以后期扩展，没有任何黑盒的内容。

虽然简单，但也具备了一个后台大部分所必需要的功能，如`自动生成菜单`、`登录` 、 `权限验证` 、 `主题切换`、`全局状态管理`


项目中使用了[arco](https://arco.design/docs/pro/start)作为ui框架，这款框架我愿称之 `antd plus 版` 


对于与使用umi作为脚手架的[antd-pro](https://pro.ant.design/zh-CN/docs/getting-started)我认为具备以下的优势

1. 没有很强的脚手架限制，可以很容易迁移到`create-react-app`或`next`或`umi`
2. 没有太多封装的东西，更容易扩展 ,而`antd-pro`中带了许多项目中不需要的东西，最近的版本越来越抽象
3. vite具备了更快的启动速度和热更新速度
4. 依赖很少，但足够使用，十分轻量，可以快速应用到自己的项目中



## 技术栈使用
| packageName | 作用         |
| ----------- | ------------ |
| react       | 构建视图框架 |
| vite        | 脚手架       |
| arco        | ui框架       |
| mockjs        | mock数据       |



目前实现了 **自动生成菜单** 、[**全局状态管理**](#状态管理) 、 [用户登录](#用户登录、额外页面) 、 [**多语言配置**](#多语言配置) 、 **主题切换** 、 [mock数据](#mock数据) 、 [**权限验证**](#权限验证)



### 路由配置

路由配置以约定的方式进行配置，

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

|     api      | 说明                                                                                                                                                                                                | 是否必须 | 类型     |
| :----------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
|    `name`    | 页面的名字，同时也会会作为左侧菜单的名字                                                                                                                                                            | 是       | string   |
|    `key`     | key值是组件路径的位置，同时也会做为路由的`path` ,一个`pages/list/index.tsx`的组件，key值就是`list`。页面中的path就是`/list` ，key值作为路由的关键参数，建议不要重复，否则难以保证不会出现奇怪的问题 | 是       | string   |
|  `children`  | 子菜单，使用这个属性之后将会在菜单中生成子菜单，                                                                                                                                                    | 否       | route[]  |
| `hideInMenu` | 设置为`true`后不会在左侧菜单中显示                                                                                                                                                                  | 否       | boolean  |
|    `icon`    | 菜单的图标 ，在    `src\Layout\index.tsx` 存在一个icon映射的函数，建议出现在菜单中的理由都设置icon，以保证美观                                                                                      | 否       | string   |
|    `auth`    | 权限配置                                                                                                                                                                                            | 否       | string[] |
|    `path`    | 如果配置了path,将默认以`path`作为路由地址。这是为了定制特制路由名而准备，比如`动态路由`                                                                                                             | 否       | string[] |
## 状态管理

此项目中使用React原生的[`context`](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext)来做全局的状态管理。


组件的路径：[`src\context\BaseContext\index.tsx`](/src/context/BaseContext/index.tsx)

可以在项目的任何组件中使用方法`getContext`来**获取或者设置**全局的状态

默认配置了以下的状态参数



|    参数名    | 说明                                                             |
| :----------: | ---------------------------------------------------------------- |
|   userInfo   | 当前登录用户                                                     |
| setUserInfo  | 设置当前登录的用户                                               |
|   setting    | 项目配置 （主题颜色 、 夜间模式等等）[setting](#setting参数说明) |
|  setSetting  | 设置项目配置                                                     |
| currentRoute | 当前的路由                                                       |

### setting参数说明

|    参数名    | 说明                | 类型              |
| :----------: | ------------------- | ----------------- |
| `collapsed`  | 是否展开侧边栏      | boolean           |
|   `theme`    | 日间模式 / 夜间模式 | `dark \ light`    |
| `themeColor` | 主题颜色            | `string`    |
|    `lang`    | 语言                | `zh-CN` \ `en-US` |


## 权限验证


权限验证的逻辑主要在[`src/Layout/components/Auth.tsx`](/src/Layout/components/Auth.tsx)组件内，使用了简单暴力的方式，如果要支持服务端配置，只要改变`routes`就能完成


## 多语言配置

多语言配置首先会配置 `arco` 组件库的默认语言配置，考虑到这个功能并不是是否必要，仅在登录组件中使用作为示例


## mock数据

项目中也配备了mock的功能，在`src\pages\login\index.tsx`中用使用示例，如果要新增接口，可以在`src/mock/index.ts`中配置，[参考文档](https://github.com/vbenjs/vite-plugin-mock)



## 用户登录、额外页面


[登录组件](/src/pages/login/index.tsx) 和后台主体分开，以此为例，如果有其他需要和主体分开的页面也可以参考登录页面，

登录成功之后，就会在全局状态中设置`userInfo`，权限控制也是根据`userInfo.auth`字段来判断的

