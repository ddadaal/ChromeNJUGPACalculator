# NJU GPA Calculator Chrome Extension

A simple Chrome Extension to calculate GPA at a click of mouse.

## Usage

Please check out [official tutorial](https://github.com/viccrubs/ChromeNJUGPACalculator/blob/master/TUTORIAL.md).

## 解决Chrome重启后扩展不能重新开启的问题

这是Chrome的锅。

>自 2016 年 11 月 21 日起，所有新发布的封装应用或托管应用都仅限 Chrome 操作系统用户使用（Windows、Mac 或 Linux 用户均无法使用这些应用）。现有的应用则会继续供所有主要平台上的用户使用，并会继续收到更新。

所以，未发布到商店的应用
- 关闭了不能再开启；
- 重启Chrome后，无法再打开。

发布到商店需要交5刀，但是因为我办不了信用卡，而且之前用的虚拟信用卡也都不能用了，所以应该短时间内不会发布到商店，请谅解……

解决方法可以试试直接加载解压的扩展程序，操作如下：

1. clone仓库到本地；
2. chrome://extensions中打开开发者模式；
3. 点击加载已解压的扩展程序...，选择dist文件夹。

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