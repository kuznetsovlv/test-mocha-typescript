const rLetter: RegExp = /[a-zA-Zа-яёА-ЯЁ]/;

const revertCharsinWord: (word: string) => string = (word: string): string => {
  const chars: string[] = word.split('');
  const revertedChars: string[] = chars
    .filter((char: string): boolean =>
      rLetter.test(char)).reverse();

  let index: number = 0;

  return chars.map((char: string): string =>
    rLetter.test(char)
      ? revertedChars[index++]
      : char
  ).join('');
};

export const revertWords: (str: string) => string
  = (str: string): string => str.split(/\s/).map(revertCharsinWord).join(' ');
