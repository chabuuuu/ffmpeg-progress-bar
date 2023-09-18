export declare class FfmpegProgressBar {
    private frameCount;
    private getFrameCommand;
    private ffmpegArgsCommand;
    private inputFilePath;
    constructor(inputFilePath: string);
    exec(ffmpegArgsCommand: readonly string[]): Promise<void>;
}
