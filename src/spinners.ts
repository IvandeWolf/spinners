/**
 *
 */

import readline from 'readline';
import cliCursor from 'cli-cursor';
import { Spinner } from './spinner.js';
import { cleanStream, writeStream } from './utils.js';

export class Spinners {
  private spinners: Spinner[] = [];
  private lineCount: number = 0;
  private interval: NodeJS.Timeout;
  private intervalTimeout: number = 50;
  private frameIndex: number = 0;
  private frameCount: number = 0;
  private stream: NodeJS.WriteStream = process.stdout;

  /**
   *
   */
  constructor() {
    this.spinners = [];
    this.interval = setInterval(() => {
      this.spin();
    }, this.intervalTimeout);

    this.bindSigint();
  }

  /**
   *
   */
  private spin() {
    this.calculateFrameCount();

    this.constructOutput();

    cliCursor.hide();

    this.frameIndex = (this.frameIndex + 1) % this.frameCount;
  }

  /**
   *
   */
  private constructOutput() {
    let output: string = '';
    const linesLength: number[] = [];
    this.spinners.forEach((spinner: Spinner) => {
      let line = spinner.getOutput(this.frameIndex);

      linesLength.push(line.length);
      output += `${line}\n`;
    });

    if (this.spinners.length == 0) readline.clearScreenDown(this.stream);
    writeStream(this.stream, output, linesLength);
    if (this.spinners.length > 0) cleanStream(this.stream, linesLength);
    this.lineCount = linesLength.length;
  }

  /**
   *
   */
  private calculateFrameCount() {
    this.frameCount = Math.max(
      0,
      ...this.spinners.map((spinner) => spinner.getFrames().length),
    );
  }

  /**
   *
   * @param spinner
   */
  public add(spinners: Spinner | Spinner[]) {
    if (Array.isArray(spinners)) {
      this.spinners = this.spinners.concat(spinners);
      this.lineCount += spinners.length;
    } else {
      this.spinners.push(spinners);
      this.lineCount++;
    }
  }

  /**
   *
   * @param spinner
   * @returns
   */
  public remove(spinner: Spinner) {
    this.spinners = this.spinners.filter(s => s !== spinner);
  }

  /**
   * 
   */
  public bindSigint() {
    process.removeAllListeners('SIGINT');
    process.on('SIGINT', () => {
      cliCursor.show();
      readline.moveCursor(process.stderr, 0, this.lineCount);
      process.exit(0);
    });
  }
}
