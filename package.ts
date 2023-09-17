// const express = require('express');
// const fileUpload = require('express-fileupload');
// const { spawn } = require('child_process');
// const fs = require('fs');
// const path = require('path');
// const { type } = require('os');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
// const app = express();
// const port = 3000;
// const cliProgress = require('cli-progress');


// export class FfmpegProgressBar{
//     private frameCount: number;
//     private getFrameCommand: string;
//     private ffmpegArgsCommand: readonly string[];
//     private inputFilePath: string;
//     private outputFilePath: string;
//     private width: number;
//     private height: number;
//     private fileName: string;
//     private fileType: string;
//     constructor(inputFilePath: string, outputFilePath: string, width: number, height: number, fileName: string, fileType: string){
//         this.frameCount = 0;
//         this.getFrameCommand = `ffmpeg -i ${inputFilePath} -map 0:v:0 -c copy -f null -`;
//         this.fileName = fileName;
//         this.fileType = fileType;
//         this.height = height;
//         this.width = width;
//         this.inputFilePath = inputFilePath;
//         this.outputFilePath = outputFilePath;
//     }
//     async exec(ffmpegArgsCommand: readonly string[]){
//         this.ffmpegArgsCommand = ffmpegArgsCommand;
//         //Read video frame
//         try {
//             const {stdout, stderr} = await exec(this.getFrameCommand);
//             var inputString = stderr.toString()
//             var frameMatch = inputString.match(/frame=\s*(\d+)/g);
//             if (frameMatch) {
//                 var frameValue = Number(frameMatch[1].match(/\d+/));
//                 this.frameCount = frameValue;
//                 console.log(`Tổng số frame: ${frameValue}`);
//             } else {
//                 throw new Error('Can not read frame of this file.')
//             }
//         } catch (error) {
//             throw new Error(error);
//         }
//             // Run the ffmpeg command to resize the video
//             const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
//             progressBar.start(this.frameCount, 0);
//             const ffmpeg = spawn('ffmpeg', this.ffmpegArgsCommand); 

        
//     }

 
// // Sử dụng lệnh ffmpeg để lấy thông tin số frame
// // console.log('Đường dẫn video: ' + inputFilePath);

    


//     ffmpeg.stderr.on('data', (data) => {

//     var inputString = data.toString()
//     var frameMatch = inputString.match(/frame=\s*(\d+)/);
//     if (frameMatch) {
//     var frameValue = Number(frameMatch[0].match(/\d+/));
//     progressBar.update(frameValue);
//     } else {
//     // console.log('Không tìm thấy giá trị frame trong chuỗi.');
//     }
//     //   console.log(data.toString());
//     });

//     ffmpeg.on('exit', (code, signal) => {
//       if (code === 0) {
//         progressBar.stop();
//         console.log('resize done');
//         res.download(outputFilePath, (err) => {
//           if (err) {
//             console.error(err);
//             res.status(500).send('Download failed.');
//           }
//         });
//       } else {
//         res.status(500).send('Video resizing failed.');
//       }
//     });

// }