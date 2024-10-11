/**
 *
 */

// import readline from 'readline';
import cliCursor from 'cli-cursor';
import { Spinner, SpinnerOptions } from './spinner.js';
import { cleanStream, writeStream } from './utils.js';
import chalk from 'chalk';

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
  }

  /**
   *
   * @param spinner
   * @returns
   */
  private get(spinner: Spinner | string) {
    if (typeof spinner === 'string') {
      return this.spinners.find((s) => s.name === spinner);
    }

    return spinner;
  }

  /**
   *
   */
  private spin() {
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
      let index = this.frameIndex % spinner.state.frames.length;
      let frame = spinner.state.frames[index];
      let line: string = `${chalk[spinner.state.prefixColor](frame)}  ${chalk[spinner.state.color](spinner.label)}`;

      linesLength.push(line.length);
      output += `${line}\n`;
    });

    writeStream(this.stream, output, linesLength);
    cleanStream(this.stream, linesLength);
    this.lineCount = linesLength.length;
  }

  /**
   *
   */
  private calculateFrameCount() {
    let maxFrames = 0;
    this.spinners.forEach((spinner) => {
      if (spinner.state.frames.length > maxFrames) {
        maxFrames = spinner.state.frames.length;
      }
    });

    this.frameCount = maxFrames;
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

    this.calculateFrameCount();
  }

  /**
   *
   * @param spinner
   * @returns
   */
  public remove(spinner: Spinner | string) {
    let sp = this.get(spinner);
    if (!sp) return;

    this.spinners = this.spinners.filter((s) => s !== sp);
  }
}
