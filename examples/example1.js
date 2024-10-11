import { DEFAULTSTATES, Spinner, Spinners } from '../dist/index.js';

let spinners = new Spinners();
let spinner0 = new Spinner('spinner0', 'Assignment 0', DEFAULTSTATES[0]);
let spinner1 = new Spinner('spinner1', 'Assignment 1', DEFAULTSTATES[1]);
let spinner2 = new Spinner('spinner2', 'Assignment 2', DEFAULTSTATES[2]);
let spinner3 = new Spinner('spinner3', 'Assignment 3', DEFAULTSTATES[3]);
let spinner4 = new Spinner('spinner4', 'Assignment 4', DEFAULTSTATES[4]);
let spinner5 = new Spinner('spinner5', 'Assignment 5', DEFAULTSTATES[5]);
let spinner6 = new Spinner('spinner6', 'Assignment 6', DEFAULTSTATES[6]);

spinners.add(spinner0);
spinners.add(spinner1);
spinners.add(spinner2);
spinners.add(spinner3);
spinners.add(spinner4);
spinners.add(spinner5);
spinners.add(spinner6);
