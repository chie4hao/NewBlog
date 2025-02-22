---
title: 操作系统搭建流程(备忘)
author: chie4
category: "blog"
cover: cover.png
date: "2018-10-08"
updateDate: "2018-10-08"
tags: ["Linux", "Manjaro", "Arch Linux", "系统配置", "Spacemacs", "代理设置"]
description: "详细记录了Arch Linux系统的搭建流程，包括shadowsocks代理配置、Spacemacs编辑器设置以及常用代理命令等系统配置经验。"
---

# 从零搭建 linux 系统

最近被安利试了下 archlinux，第一次使用 pacman 和 yaourt，不得不说确实比之前用的 ubuntu 里 apt-get 配一堆乱七八糟的密钥方便很多。安装所有软件就一行命令，省掉大量折腾时间。从配置各种环境到搭建桌面到开始干活，我只用了一天时间。这次简单做个备忘吧。

### ss

第一步肯定是先更新，考虑到国内网络环境，先搭个简单的梯子

```bash
sudo pacman -S shadowsocks-libev
vim ~/shadowsocks-libev/config.json
```

&emsp;&emsp;

config.json

```json
{
  "server": "",
  "server_port": 3389,
  "local_port": 1080,
  "password": "",
  "timeout": 60,
  "method": "chacha20-ietf-poly1305",
  "fast_open": true
}
```

之后在`/etc/profile`中加入设置 ss 开机自动后台运行

```
nohup ss-local -c ~/shadowsocks-libev/config.json &
```

### proxychains

```bash
sudo pacman -S proxychains-ng
# /etc/proxychains.conf 中添加代理host和port
```

### spacemacs

```bash
sudo pacman -S emacs
cd ~
mv .emacs.d .emacs.d.bak
mv .emacs .emacs.bak
git clone https://github.com/syl20bnr/spacemacs ~/.emacs.d.bak
emacs --insecure
```

为 konsole 中的添加透明效果，在`~/.emacs.d/init.el`中添加如下代码,`~/.spacemacs`中配置就太多了，今后在逐渐完善。

```lisp
(global-hl-line-mode 0)
(defun set-background-for-terminal (&optional frame)
  (or frame (setq frame (selected-frame)))
  "unsets the background color in terminal mode"
  (unless (display-graphic-p frame)
    (set-face-background 'default "unspecified-bg" frame)))
(add-hook 'after-make-frame-functions 'set-background-for-terminal)
(add-hook 'window-setup-hook 'set-background-for-terminal)
```

常用代理

```bash
git config --global http.proxy 'http://192.168.50.235:1080'
git config --global https.proxy 'http://192.168.50.235:1080'

git config --global --unset http.proxy
git config --global --unset https.proxy


export http_proxy=http://192.168.50.235:1080
export https_proxy=http://192.168.50.235:1080
unset ...
```
