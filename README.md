# NJU GPA Calculator Chrome Extension

A simple Chrome Extension to calculate GPA at a click of mouse.

## Usage

### Load the extension

1. Clone or download this repository
2. Open Chrome, open **Extensions** page by going to **chrome://extensions** or **Tools > Extensions** 
3. Check **Developer mode** in the top right corner if you haven't done that
4. Click `Load unpacked extension...`
5. Select the `dist` folder and see the extension appears on the list.

I'll provide a standalone **crx** file when it's more developed.

### Use it 
1. Log in [NJU Educational Administration System](https://elite.nju.edu.cn/jiaowu/)
2. Navigate to **成绩查看**
3. Ensure that the URL is or starts with **http://elite.nju.edu.cn/jiaowu/student/studentinfo/achievementinfo.do?method=searchTermList**
4. Click the button of this extension besides the URL bar.
5. Your numbers show in the popup.

## Development

This extension is based on
- TypeScript
- Webpack

Although it's much simpler than most projects with these technologies out there, you should still check some tutorials before you start development.

### Install dependencies

`npm install`

### Build 

`npm run build`

## License

MIT