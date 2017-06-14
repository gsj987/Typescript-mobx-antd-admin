# Typescript-Mobx-Antd-Admin

本项目是 [Antd-Admin](https://github.com/zuiidea/antd-admin) 的Typescript+Mobx改写。

## 特性
* 基于[React](https://github.com/facebook/react)，[ant-design](https://github.com/ant-design/ant-design)
* 基于[Antd-Admin](https://github.com/zuiidea/antd-admin)，是一个比较完整的Admin Panel的实现
* 不使用[dvajs](https://github.com/dvajs/dva)和[roadhog](https://github.com/sorrycc/roadhog)，完全的webpack + mobx + react-router的实现，尽可能的减少依赖，适应尽量多的开发情况
* 基于 React-router 的动态Model和路由，按需载入
* 基于 webpack-dev-server 实现Mock功能
* 使用 Typescript 作为开发语言，自动的参数和类型检测，方便规模团队的协同开发
* 使用 [Mobx](https://github.com/mobxjs/mobx) 代替 Redux，更加简单灵活容易理解，提供类似 MVVM 的开发体验

## 开发架构
参考 [Antd-Admin](https://github.com/zuiidea/antd-admin) 的 README

## 快速开始

安装依赖：
```bash
npm i
```

编译第三方库为DLL：
```bash
npm run build:dll
```

开启开发服务器：
```bash
npm run dev
```

编译发布版本：
``` bash
npm run build:prod
```
