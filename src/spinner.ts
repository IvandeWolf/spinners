/**
 * @class spinner
 */

export type State = {
  name: string;
  frames: string[];
  color: Color;
  prefixColor: Color;
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

export const DEFAULTSTATES: State[] = [
  {
    name: 'busy',
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    color: Color.white,
    prefixColor: Color.white,
  },
  {
    name: 'success',
    frames: ['✓'],
    color: Color.green,
    prefixColor: Color.greenBright,
  },
  {
    name: 'error',
    frames: ['✖'],
    color: Color.red,
    prefixColor: Color.redBright,
  },
  {
    name: 'warning',
    frames: ['!'],
    color: Color.yellow,
    prefixColor: Color.yellow,
  },
  {
    name: 'info',
    frames: ['i'],
    color: Color.blue,
    prefixColor: Color.blue,
  },
  {
    name: 'star',
    frames: ['★'],
    color: Color.yellow,
    prefixColor: Color.yellowBright,
  },
  {
    name: 'pointer',
    frames: ['❯'],
    color: Color.white,
    prefixColor: Color.white,
  },
];

export type SpinnerOptions = {
  state: State;
};

export class Spinner {
  public state: State;
  public name: string;
  public label: string;
  public indent: number;

  /**
   *
   * @param name
   * @param options
   */
  constructor(
    name: string,
    label: string,
    state: State = DEFAULTSTATES[0],
    indent = 0,
  ) {
    this.name = name;
    this.label = label;
    this.indent = indent;
    this.state = state;
  }

  public update(state: State) {
    this.state = state;
  }
}
