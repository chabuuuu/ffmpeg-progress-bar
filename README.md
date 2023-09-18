## PROGRESS BAR CLI FOR FFMPEG NODEJS
<h1 align="center">
   <b>
        <a href="https://github.com/chabuuuu/ffmpeg-progress-bar">
            <img src="https://github.com/chabuuuu/ffmpeg-progress-bar/blob/main/git_image.png?raw=true" /></a><br>
    </b>
</h1>
<p align=""center>A progress bar cli for ffmpeg</p>
## Contents

1. [Installation](#installation)
1. [Usage](#usage)
1. [Configuration](#configuration)
1. [Requirements](#requirements)
1. [Author](#author)


## <a name="installation"/></a> Installation

```bash
$ npm i ffmpeg-bar
```

## <a name="usage"/></a> Usage
###### 
```bash
import { FfmpegProgressBar } from 'ffmpeg-bar';
    const bar = new FfmpegProgressBar(yourInputFilePath)
    await bar.exec(command);
    //command: your args ffmpeg command
    //ex: ffmpeg -i input.mp4 -vf scale=200:300 output.mp4 -> ['-i', 'input.mp4', '-vf', 'scale=200:300', 'output.mp4']
```
```bash
import { FfmpegProgressBar } from 'ffmpeg-bar';
    const bar = new FfmpegProgressBar('input.mp4')
    const command = [
      '-i',
      'input.mp4',
      '-vf',
      `scale=200:300`,
      'output.mp4',
  ];
    await bar.exec(command);
```
## <a name="configuration"/></a> Configuration

Comming soon
## <a name="requirements"/></a> Requirements

 - [Node.js](https://nodejs.org/)
 - [FFmpeg](https://ffmpeg.org/), installed correctly
## <a name="author"/></a> Author

[chabuuuu](https://github.com/chabuuuu)
[Npm package](https://www.npmjs.com/package/ffmpeg-bar)