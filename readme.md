# cli-dye

Lightweight and minimal method to dye and color logs in the node CLI. Zero dependencies, tiny file-size, flexible use.

## Install

```
npm i cli-dye
```

## Imports

cli-dye comes with four imports

- `color` - Converts strings to an ANSI escape color sequence
- `dyeStr` - Adds ANSI escape color sequence before string then appends a reset color at the end of the string
- `dyeLog` - Combines `dyeStr` with a `console.log`
- `Dye` - Contains methods to create color logs with a similar syntax to the <i>chalk</i> node package like `new Dye().red('text')`

## color

### First Parameter `string`

The first parameter is a string that determines the color part of the ANSI escape code. The strings are not case sensitive. The following color options are available:

- "black"
- "red"
- "green"
- "yellow"
- "blue"
- "magenta"
- "cyan"
- "white"

The string can also include "background", abbreviated "bg", as well as "bright" / "bold", abbreviated as "br." This allows combinations like "boldblack", "brightred", "brgreen", "backgroundyellow", and "bgblue."

If the color code is invalid, the escape code will fall back on a reset.

### Second Parameter `string | Array`

The second parameter is additional decorations that can be added to text that are not included in the ANSI color escape code. The additional options are "bold", "underline" / "und", and "reversed" / "rev." The decorations parameter can be either a string like `"underrev"` and `"bold,underline"` or an array like `["rev", "und"]`.

Sometimes these decorations are not needed or redundant, so this is an optional parameter.

### Example

```javascript
import { color } from 'cli-dye';

const red = color('red');

console.log(red + 'Red is my favorite color');
// warning: In some terminals the color will persist until you use the reset code, "\u001b[0m"

const underlineBlue = color('blue', 'und');

console.log(underlineBlue + 'I like to underline the color blue');
```

## dyeStr

Builds on top of the `color` funciton by introducing a first parameter for text (the text you would actually want to be a different color) and then ends the entire string with an ANSI reset color escape code.

```javascript
import { dyeStr } from 'cli-dye';

const error = ['brred', 'und'];

console.log(dyeStr('There was an error in this program', ...error));

const success = 'brightgreen';

console.log(dyeStr('You were successful', success));
```

## dyeLog

Has the same parameters as color string, but calls `console.log`.

```javascript
import { dyeLog } from 'cli-dye';

const warning = 'bryellow';

dyeLog('Warning: Show the user a cool warning', warning);
```

## Dye

Creates a class with methods that are the names of colors from the color list. Each method calls a `dyeLog` function.

```javascript
import { Dye } from 'cli-dye';

const dye = new Dye();

dye.green('Green machine');
```

## Code Examples

```javascript
import { dyeLog } from 'cli-dye';

dyeLog(`Text to display in bright cyan`, 'brcyan');

dyeLog(`Text to display in red with an underline`, 'red', 'underline');

dyeLog(
  `Text to display in bright green with an underline, reversed`,
  'brgreen',
  'underline,reversed',
);
```

```javascript
const readline = require('readline');
const { dyeLog, color, dyeStr } = require('cli-dye');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const theme = {
  error: 'bold-red',
  warn: 'bold-yellow',
  prompt: 'bold-cyan',
  success: 'bold-green',
  input: 'bold-white',
};

rl.question(
  dyeStr('What do you think of Node.js? ', theme.prompt) + color(theme.input),
  (answer) => {
    dyeLog(
      `Thank you for your valuable feedback: ${dyeStr(answer, theme.input)}`,
      theme.success,
    );

    rl.close();
  },
);
```
