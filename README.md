# Espresso -- A programming language for Homebots VM

This is my pet project of a language to program esp8266 devices using a more natural and less boring language than C/C++.

## Introduction

## Data types

| type             | description                                          |
| ---------------- | ---------------------------------------------------- |
| `int32`          | a 32-bit number                                      |
| `string`         | a sequence of characters between single quotes (`'`) |
| `byte`           | 8-bit galore                                         |
| `bool`           | true / false. Either you do or you don't             |
| `reference`      | reference to a variable                              |
| `memory_address` | 32-bit memory address                                |
| `pin`            | 1..16                                                |

## Unary Operators

| type          | description                   |
| ------------- | ----------------------------- |
| `++$variable` | add 1 to $variable            |
| `--$variable` | subtract 1 of $variable       |
| `!!$variable` | invert all bits of a variable |

## Binary Operators

| type  | description   |
| ----- | ------------- |
| `and` | a and b       |
| `or ` | a or b        |
| `xor` | a xor b       |
| `add` | a + b         |
| `sub` | a - b         |
| `mul` | a \* b        |
| `div` | a / b         |
| `mod` | rest of a / b |

## Comparison

| type   | description                  |
| ------ | ---------------------------- | --- | ------ |
| `gt`   | a greater than b             |
| `gte`  | a greater than or equal to b |
| `lt`   | a less than b                |
| `lte`  | a less than or equal to b    |
| `is`   | a equals b                   |
| `isnt` | a not equals b               |
| `&&`   | a and b                      |
| `      |                              | `   | a or b |

## Variables

All variables point to 32-bit integers, which then can be used as boolean, byte, integer or a memory address

| type                       | description                                    |
| -------------------------- | ---------------------------------------------- |
| `var $v`                   | declare a variable in the current scope        |
| `$v = 1`                   | assign integer to $v                           |
| `$v = 0x01`                | assign byte to $v                              |
| `$v1 = $v2`                | assign one variable to another                 |
| `@3 = 1`                   | assign 1 to pin 3                              |
| `**0x00112233 = $variable` | assign variable value to a memory address      |
| `$variable = **0x00112233` | copy content from memory address to a variable |

## Keywords

**General keywords**:

| keyword   | description                       |
| --------- | --------------------------------- |
| `program` | shortly describes a program       |
| `fn`      | declare a function                |
| `begin`   | begin of a code block             |
| `end`     | end a function body or code block |

**System/Debug**:

| keyword     | description                                          |
| ----------- | ---------------------------------------------------- |
| `debug on`  | enable serial debug output                           |
| `debug off` | disable serial debug output                          |
| `dump`      | print current stack state and program bytes          |
| `sysinfo`   | print system and memory information to serial output |
| `noop`      | does nothing                                         |
| `print`     | write a string to serial output                      |

**Flow control**:

| keyword           | description                                       |
| ----------------- | ------------------------------------------------- |
| `exit`            | stop the program                                  |
| `restart`         | restart the program                               |
| `jump to`         | go to any place in a program                      |
| `jump if .. to`   | go to any place in a program based on a condition |
| `delay <integer>` | delay execution by a large time (>= 1ms)          |
| `yield <byte>`    | delay execution for a tiny bit (up to 255 us)     |

**I/O instructions**:

| instruction             | description                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| @<pin> = $variable      | write to pin                                                       |
| $variable = @<pin>      | read pin                                                           |
| `mode` <pin> <pin_mode> | PinInput = 0, PinOutput = 1, PinOpenDrain = 2, PinInputPullUp = 3, |
| `type` <pin> <pin_type> | `io`, `tx` or `rx`                                                 |

**i2c instructions**:

| keyword | description                 |
| ------- | --------------------------- |
| i2start | start of an i2c transaction |
| i2stop  | end of an i2c transaction   |
