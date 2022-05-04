import { words } from './words.js';

export function generateWords() {
  return Array(12)
    .fill(12)
    .reduce((acc, _) => {
      const getRandom = () => Math.floor(Math.random() * words.length);
      let random = getRandom();
      while (acc.indexOf(random) !== -1) {
        random = getRandom();
      }
      return [...acc, random];
    }, [])
    .map((index) => words[index])
    .join(' ');
}
