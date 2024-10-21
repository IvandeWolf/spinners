import chalk from 'chalk';

/**
 * @class spinner
 */

export type State = {
  frames: string[];
  color: Color;
  frameColor?: Color;
};

export enum Color {
  'black' = 'black',
  'red' = 'red',
  'green' = 'green',
  'yellow' = 'yellow',
  'blue' = 'blue',
  'magenta' = 'magenta',
  'cyan' = 'cyan',
  'white' = 'white',
  'gray' = 'gray',
  'redBright' = 'redBright',
  'greenBright' = 'greenBright',
  'yellowBright' = 'yellowBright',
  'blueBright' = 'blueBright',
  'magentaBright' = 'magentaBright',
  'cyanBright' = 'cyanBright',
  'whiteBright' = 'whiteBright',
}

export const DEFAULTSTATES = {
  empty: {
    frames: [],
    color: Color.white,
  },
  busy: {
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    color: Color.white,
  } as State,
  success: {
    frames: ['✓'],
    color: Color.green,
    prefixColor: Color.greenBright,
  } as State,
  error: {
    frames: ['✖'],
    color: Color.red,
    prefixColor: Color.redBright,
  } as State,
};

export type SpinnerOptions = {
  state: State;
};

export class Spinner {
  public state: State;
  public label: string;
  public indent: number;

  /**
   *
   * @param name
   * @param options
   */
  constructor(label: string, state: State = DEFAULTSTATES.empty, indent = 0) {
    this.label = label;
    this.indent = indent;
    this.state = state;

    if (this.state.frameColor === undefined) {
      this.state.frameColor = this.state.color;
    }
  }

  public update(state: State) {
    this.state = state;

    if (this.state.frameColor === undefined) {
      this.state.frameColor = this.state.color;
    }
  }

  public getFrames(): string[] {
    return this.state.frames || [];
  }

  public getOutput(index: number): string {
    let output = '';

    if (this.indent > 0) {
      output += ' '.repeat(this.indent);
      output += '⤷ ';
    }

    if (this.getFrames().length == 0) {
      output += `${chalk[this.state.color](this.label)}`;
      return output;
    }

    /* We will never return here, because the frameColor gets set in the constructor */
    if (this.state.frameColor === undefined) return '';

    index %= this.getFrames().length;

    let frame = this.getFrames()[index];
    output += `${chalk[this.state.frameColor](frame)} ${chalk[this.state.color](this.label)}`;

    return output;
  }
}
