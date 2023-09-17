const express = require('express');
const fileUpload = require('express-fileupload');
const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { type } = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const app = express();
const port = 3000;
const cliProgress = require('cli-progress');
app.use(fileUpload());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/resize', async (req, res) => {
  async function test(){
    // if (!req.files || !req.files.video) {
    //   return res.status(400).send('No video uploaded.');
    // }
    return new Promise(async (resolve, reject) => {
      const videoFile = req.files.video;
    const width = req.body.width || 640; // Default width
    const height = req.body.height || 480; // Default height
  
    const inputFilePath = path.join(__dirname, 'uploads', videoFile.name);
    const outputFileName = `resized_${width}_${height}_${videoFile.name}`;
    const outputFilePath = path.join(__dirname, 'public', 'output', outputFileName);
    var frameCount = 0;
    // Move the uploaded video to the uploads folder
    await videoFile.mv(inputFilePath, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
  });
  // Sử dụng lệnh ffmpeg để lấy thông tin số frame
  // console.log('Đường dẫn video: ' + inputFilePath);
  const ffmpegCommand = `ffmpeg -i ${inputFilePath} -map 0:v:0 -c copy -f null -`;
  
      const {stdout, stderr} = await exec(ffmpegCommand);
          var inputString = stderr.toString()
          // console.log('Input string: ' + inputString);
          var frameMatch = inputString.match(/frame=\s*(\d+)/g);
          // console.log(frameMatch);  
          if (frameMatch) {
              var frameValue = Number(frameMatch[1].match(/\d+/));
              frameCount = frameValue;
              // console.log(typeof frameValue);
              // console.log(`Tổng số frame: ${frameValue}`);
          } else {
          console.log('Không tìm thấy giá trị frame trong chuỗi.');
          }
      
  
      // Run the ffmpeg command to resize the video
      const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
      bar1.start(frameCount, 0);
      const ffmpeg = spawn('ffmpeg', [
        '-i', inputFilePath,
        '-vf', `scale=${width}:${height}`,
        outputFilePath,
      ]);
  
      ffmpeg.stderr.on('data', (data) => {
  
      var inputString = data.toString()
      var frameMatch = inputString.match(/frame=\s*(\d+)/);
      if (frameMatch) {
      var frameValue = Number(frameMatch[0].match(/\d+/));
      bar1.update(frameValue);
      } else {
      // console.log('Không tìm thấy giá trị frame trong chuỗi.');
      }
      //   console.log(data.toString());
      });
  
      ffmpeg.on('exit', (code, signal) => {
        if (code === 0) {
          bar1.stop();
          console.log('resize done');
          // res.download(outputFilePath, (err) => {
          //   if (err) {
          //     console.error(err);
          //     res.status(500).send('Download failed.');
          //   }
          // });
          resolve();
        } else {
          reject(new Error('Video failed'))
        }
      });  

    })
    
  }
  async function print(){
    console.log('hello world');
  }
  try {
      
    await test();
    await print();
  } catch (error) {
    console.log(error);
  }
}

);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
