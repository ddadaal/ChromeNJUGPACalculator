# Tutorial

It's the tutorial that may help you make the most of this tool.

## 安装

因为开发者账号还在申请（5刀支付了一天了都还没有支付成功……），所以目前只能手动安装这个扩展。

1. 打开Chrome的**扩展程序**界面，通过访问[chrome://extensions](chrome://extensions)或者**菜单>更多工具>扩展程序**
2. 将下载的crx文件**拖入**网页进行安装。

## 使用

### 初始化

Popup Window指

> 点击**位于地址栏右侧**的图标后弹出的窗口

。

在教务网之外点击图标将会得到提示：
> 请打开教务网的“成绩查询”页面！

所以请先进入[教务网成绩查询界面](http://elite.nju.edu.cn/jiaowu/student/studentinfo/achievementinfo.do?method=searchTermList)。本扩展程序只在这个页面生效。

点击图标后将会得到类似以下的信息：

![popupwindow1](http://wx2.sinaimg.cn/mw690/9e4c3c1bgy1fj6mnzlqzij208o08u3ym.jpg)

将会自动显示**当前页面对应学期**以及**所有已选择学期**的信息。

非常明显的东西，不再赘述。

教务网成绩的表格将会变为下图（版本v2.0）：

![initialState1](http://wx1.sinaimg.cn/mw690/9e4c3c1bgy1fj6mp9ijq2j20yt0glwhr.jpg)

**默认情况下，程序将自动勾选公选课和通识课以外的所有课程。请根据自己的实际情况进行修改。**


### 单个学期

点击按钮**计算GPA**将会计划本页面上的已经勾选的课程的**总学分**和**GPA**值。

![5](http://wx3.sinaimg.cn/mw690/9e4c3c1bgy1fj6n27dktuj20d501bq2t.jpg)

同时，Popup Window也会显示当前学期的信息。

### 多个学期

从v2.0版本开始，扩展支持多个学期。

要开始，请在一个学期下点击**选择这个学期**按钮。

![6](http://wx2.sinaimg.cn/mw690/9e4c3c1bgy1fj6n4mgstoj20o102474g.jpg)

点击后，此栏将会变化成如下图所示。

![3](http://wx2.sinaimg.cn/mw690/9e4c3c1bgy1fj6n26u0faj20n9027jrj.jpg)

此时，Popup Window也会显示如下信息。

![7](http://wx2.sinaimg.cn/mw690/9e4c3c1bgy1fj6n26y157j208o08x74f.jpg)

进入另一个学期，点击**选择这个学期**按钮，再进入Popup Window，会发现如下变化。

![8](http://wx1.sinaimg.cn/mw690/9e4c3c1bgy1fj6n2739fdj208o09djrk.jpg)

如果想重新选择学期中需要计划的课程，请勾选与反选checkboxes后点击**更新这个学期的信息**按钮,

![3](http://wx2.sinaimg.cn/mw690/9e4c3c1bgy1fj6n26u0faj20n9027jrj.jpg)

，成功后将有提示框。

![4](http://wx1.sinaimg.cn/mw690/9e4c3c1bgy1fj6n2791i5j20c903sq2r.jpg)


**当你进入某个已经被选择的学期对应的页面时，其课程勾选状态将会和已经选择的课程（而不是默认情况下的公选课通识课以外课程）一致。**


如果想取消选择某一个学期，请点击**取消选择这个学期！** 按钮，成功后此栏将会变为初始状态。


同时，你也可以在Popup Window里点击**取消选择所有学期**按钮，点击后Popup Window以及网页将会刷新，勾选状态将会重置成为默认状态。




