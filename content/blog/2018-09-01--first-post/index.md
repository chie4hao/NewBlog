---
title: first-post
author: chie4
category: "blog"
cover: cover.png
date: "2018-09-01"
updateDate: "2018-09-01"
tags: ["Gatsby", "博客搭建", "React", "静态站点", "PWA"]
description: "记录从Hexo迁移到Gatsby的博客重建过程，包括新博客的特性介绍、构建流程以及外部服务配置等内容。"
---

&emsp;&emsp;first post 是我新 blog 开发完成后的第一篇文档，也算是对这段时间开发过程的小结和备忘。

&emsp;&emsp;首先是博客框架由之前的 hexo 换到现在的 Gatsby。两者都是利用渲染引擎搭建静态站点，只不过换成了我更熟悉的 React 而已，定制化程度更高了，简要介绍一些特性。

- 自动压缩图片以适应不同设备，惰性加载并且支持 `webp` (gatsby-image)
- 支持 PWA (manifest.webmanifest, offline support, favicons)
- 轻松定制博客主题 (via `theme` object generated `yaml` file)
- 搜索插件使用 [Algolia](https://www.algolia.com/), 评论插件使用 [Facebook](https://developers.facebook.com/), 配备[Google analytics](https://marketingplatform.google.com/about/analytics/)
- 支持分享(Twitter, Facebook, Google, Linkedln)

### 构建流程:

```bash
npm install --global gatsby-cli
git clone https://github.com/chie4hao/gatsbyBlog
```

进入新的项目目录下运行

```bash
gatsby develop
```

### 外部服务依赖

在项目根路径下创建 `.env`文件，以支持评论、搜索和分析功能，把文件中的`...`替换成真正的数据

```
GOOGLE_ANALYTICS_ID=...
ALGOLIA_APP_ID=...
ALGOLIA_SEARCH_ONLY_API_KEY=...
ALGOLIA_ADMIN_API_KEY=...
ALGOLIA_INDEX_NAME=...
FB_APP_ID=...
```

### 博客构建流程

因为是全静态站点，网站服务器上用 nginx 反向代理就完事了。而且整个站点打包体积不大，目前只有约 30Mb，完全不需要在服务器上搭建博客构建所需的环境，只需在本机和远程服务器实现文件同步即可。目前同步工具使用[syncthing](https://github.com/syncthing/syncthing)，每次更新在本机运行`gatsby build`即可完成构建。（网站规模太小了，也懒得用`syncthing`了，直接用 `rsync` ，`sudo rsync -av --delete --rsh=ssh ~/github/gatsbyBlog/public chie4@110.10.178.135:~/` ）

注意服务器上的 ssl 证书未设置成自动更新，需 90 天手动更新一次，否则会失效。
