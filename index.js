function color(color = '', decorations = '') {
  const escape = '\u001b[';
  color = color.replace(/\s+|-+|_+|\.+/g, '');

  const isBackground = color.match(/(background|bg)/i);
  if (isBackground) isBackground.forEach((m) => (color = color.replace(m, '')));
  let bgCode = isBackground ? '4' : '3';

  const isBrightColor = color.match(/(bright|bold|br)/i);
  if (isBrightColor)
    isBrightColor.forEach((m) => (color = color.replace(m, '')));
  let brightCode = isBrightColor ? ';1m' : 'm';

  const plainCol = color.toLowerCase();

  let colorCode;
  switch (plainCol) {
    case 'black':
      colorCode = '0';
      break;
    case 'red':
      colorCode = '1';
      break;
    case 'green':
      colorCode = '2';
      break;
    case 'yellow':
      colorCode = '3';
      break;
    case 'blue':
      colorCode = '4';
      break;
    case 'magenta':
      colorCode = '5';
      break;
    case 'cyan':
      colorCode = '6';
      break;
    case 'white':
      colorCode = '7';
      break;
    default:
      // resets the terminal color
      bgCode = '';
      colorCode = '0';
      brightCode = 'm';
  }

  if (Array.isArray(decorations)) {
    decorations = decorations.join('');
  }
  const bold = decorations.match(/bold/i) ? escape + '1m' : '';
  const underline = decorations.match(/(underline|und)/i) ? escape + '4m' : '';
  const reversed = decorations.match(/(inversed|inv|reversed|rev)/i)
    ? escape + '7m'
    : '';
  const colorEsc =
    escape + bgCode + colorCode + brightCode + bold + underline + reversed;

  return colorEsc;
}

function dyeStr(text, col, dec) {
  const reset = '\u001b[0m';
  return color(col, dec) + text + reset;
}

function dyeLog(text, col, dec) {
  console.log(dyeStr(text, col, dec));
}

const colors = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
];

class Dye {
  constructor() {
    colors.forEach((c) => {
      this[c] = (string) => dyeLog(string, c);
    });
  }
}

module.exports = {
  color,
  dyeStr,
  dyeLog,
  Dye,
};
