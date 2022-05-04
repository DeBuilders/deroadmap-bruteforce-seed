import { Keypair } from '@solana/web3.js';
import * as Bip39 from 'bip39';
import * as fs from 'fs';
import { generateWords } from '../helpers.js';

let index = 0;

const entriesFilename = './files/entries.txt';
const resultsFilename = './files/results.txt';

async function main() {
  index++;

  let phrase = generateWords();

  const seed = Bip39.mnemonicToSeedSync(phrase).slice(0, 32);
  const account = Keypair.fromSeed(seed);
  const pubKey = account.publicKey.toString();

  console.log(`Try #${index} ${pubKey}: ${phrase}`);

  const entries = fs.readFileSync(entriesFilename);

  if (entries.includes(pubKey)) {
    setTimeout(function () {
      console.log('SAME ENTRY');
      return main();
    }, 0);
  } else {
    if (pubKey === 'CqHBALZHoYYQ7ymr5TdgWhvCc19GHVGubkAaRAq3th2a') {
      console.error('FOUND IT', phrase);
      await fs.appendFileSync(resultsFilename, `\n${phrase}`);
      console.error('CHECK FILE', phrase);
    } else {
      await fs.appendFileSync(entriesFilename, `\n${phrase}`);
      setTimeout(function () {
        return main();
      }, 0);
    }
  }
}

main();
