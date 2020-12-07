import blinky from './blinky.txt';
import txRxOutput from './tx-rx-output.txt';
import stepperMotor from './stepper-motor.txt';
import stepperMotor1bit from './stepper-motor-1-bit.txt';

export default [
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
    id: 'blinky',
    title: 'Blinky',
    code: blinky,
  },
  {
    id: 'tx-rx-output',
    title: 'Use TX/RX as output',
    code: txRxOutput,
  },
];
