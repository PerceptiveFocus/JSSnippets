const bip39 = require('bip39');

const strengthBits = 256; // 256 bits of entropy for a 24-word phrase (15 bits per word)
const mnemonic = bip39.generateMnemonic(strengthBits);
console.log('Mnemonic Phrase:', mnemonic);
