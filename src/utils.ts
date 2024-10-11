import readline from 'readline';

export function breakText(text: string, prefixLength: number): string {
  return text
    .split('\n')
    .map((line, index) =>
      index === 0 ? breakLine(line, prefixLength) : breakLine(line, 0),
    )
    .join('\n');
}

export function breakLine(line: string, prefixLength: number): string {
  const columns = process.stderr.columns || 95;
  return line.length >= columns - prefixLength
    ? `${line.substring(0, columns - prefixLength - 1)}\n${breakLine(
        line.substring(columns - prefixLength - 1, line.length),
        0,
      )}`
    : line;
}

export function getLinesLength(text: string, prefixLength: number): number[] {
  return text
    .split('\n')
    .map((line, index) =>
      index === 0 ? line.length + prefixLength : line.length,
    );
}

export function writeStream(stream: NodeJS.WriteStream, output: string, rawLines: number[]) {
  stream.write(output);
  readline.moveCursor(stream, 0, -rawLines.length);
}

export function cleanStream(stream: NodeJS.WriteStream, rawLines: number[]) {
  rawLines.forEach((lineLength, index) => {
    readline.moveCursor(stream, lineLength, index);
    readline.clearLine(stream, 1);
    readline.moveCursor(stream, -lineLength, -index);
  });
  readline.moveCursor(stream, 0, rawLines.length);
  readline.clearScreenDown(stream);
  readline.moveCursor(stream, 0, -rawLines.length);
}

export function terminalSupportsUnicode() {
  // The default command prompt and powershell in Windows do not support Unicode characters.
  // However, the VSCode integrated terminal and the Windows Terminal both do.
  return (
    process.platform !== 'win32' ||
    process.env.TERM_PROGRAM === 'vscode' ||
    !!process.env.WT_SESSION
  );
}
