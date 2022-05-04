import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import * as Bip39 from 'bip39';
import * as fs from 'fs';
import { generateWords } from '../helpers.js';

let index = 0;

async function main() {
  const con = new Connection('https://ssc-dao.genesysgo.net', 'confirmed');
  index++;

  try {
    let phrase = generateWords();

    const seed = Bip39.mnemonicToSeedSync(phrase).slice(0, 32);
    const account = Keypair.fromSeed(seed);

    console.log(`Try #${index}: ${phrase}`);

    const balance = await con.getBalance(account.publicKey);

    const tokenAccounts = await con.getTokenAccountsByOwner(
      new PublicKey(account.publicKey),
      {
        mint: new PublicKey('DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ')
      },
      'finalized'
    );

    if (balance > 0 || tokenAccounts.value.length > 0) {
      console.error('FOUND SOMETHING', phrase, balance);
      await fs.appendFileSync('./files/results.txt', `\n${phrase}:${balance}`);
      return main();
    } else {
      return main();
    }
  } catch (err) {
    console.log('err', err);
    return main();
  }
}

main();
