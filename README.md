# NJU GPA Calculator Chrome Extension

A simple Chrome Extension to calculate GPA at a click of mouse.

## Usage

Please check out [official tutorial](https://github.com/viccrubs/ChromeNJUGPACalculator/blob/master/TUTORIAL.md).

## 解决Chrome重启后/关闭后扩展不能重新开启的问题

Chrome在某个版本后不允许不来自于官方商店的扩展运行。

>To protect you while you browse, Chrome only lets you use extensions that have been published on the Chrome Web Store.

(Source: https://support.google.com/chrome/answer/2811969?p=ui_remove_non_cws_extensions&rd=1&hl=en)

所以，未发布到商店的应用
- 关闭了不能再开启；
- 重启Chrome后，无法再打开。

发布到商店需要交5刀，但是因为我办不了信用卡，而且之前用的虚拟信用卡也都不能用了，所以应该短时间内不会发布到商店，请谅解。

解决方法目前有三个，推荐第一个：

- 直接加载解压的扩展程序。操作如下：
    1. clone仓库到本地；
    2. chrome://extensions中打开开发者模式；
    3. 点击**加载已解压的扩展程序...**，选择仓库里的dist文件夹。
- 安装Chrome的Canary版本或者Chromium。这些版本不如原版稳定，不推荐。
- 安装其他基于Chromium的浏览器。推荐[Cent Browser](https://www.centbrowser.com/)，支持Google账号登录，自带实用的功能（比如鼠标手势什么的），而且据说也比Chrome省资源。

## Development

This extension is based on
- TypeScript
- Webpack

You should check out something about these before starting developing this project.

### Install dependencies

`npm install`

### Build 

`npm run build`

The built files will be stored under **/dist** directory.

You can load the folder directly into your chrome with developer mode enabled.

## License

MIT