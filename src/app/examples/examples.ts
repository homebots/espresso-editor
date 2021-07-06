import blinky from './blinky.txt';
import txRxOutput from './tx-rx-output.txt';
import stepperMotor from './stepper-motor.txt';
import stepperMotor1bit from './stepper-motor-1-bit.txt';
import ssd1306x64Owl from './ssd1306-128-64-owl.txt';

export default [
  {
    id: 'blinky',
    title: 'Blinky',
    code: blinky,
  },
  {
    id: 'stepper-motor',
    title: 'Stepper Motor',
    code: stepperMotor,
  },
  {
    id: 'stepper-motor-1bit',
    title: 'Stepper Motor - 1 bit',
    code: stepperMotor1bit,
  },
  {
    id: 'tx-rx-output',
    title: 'Use TX/RX as output',
    code: txRxOutput,
  },
  {
    id: 'ssd1306-128-64-owl',
    title: 'LCD display 128x64 - Owl',
    code: ssd1306x64Owl,
  },
];
