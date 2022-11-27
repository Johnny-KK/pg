const KEY_ALGORITHM = 'AES-CBC';
const KEY_LENGTH = 256;
const KEY_FORMAT = 'jwk';
const KEY_EXTRACTABLE = true;
const IV: Uint8Array = new TextEncoder().encode('iviviviviviviviv');

async function geneKeyString(): Promise<string> {
  const key: CryptoKey = await window.crypto.subtle.generateKey({ name: KEY_ALGORITHM, length: KEY_LENGTH }, KEY_EXTRACTABLE, ['encrypt', 'decrypt']);
  const keyraw: JsonWebKey = await window.crypto.subtle.exportKey(KEY_FORMAT, key);
  return JSON.stringify(keyraw);
}

async function encrypt(keyString: string, content: string): Promise<string> {
  const key: CryptoKey = await importKey(keyString);
  const result: ArrayBuffer = await window.crypto.subtle.encrypt({ name: KEY_ALGORITHM, iv: IV }, key, str2ab(content));
  return ab2str(result);
}

async function decrypt(keyString: string, content: string): Promise<string> {
  const key: CryptoKey = await importKey(keyString);
  console.warn(key);
  const result = await window.crypto.subtle.decrypt({ name: KEY_ALGORITHM, iv: IV }, key, str2ab(content));
  return ab2str(result);
}

async function importKey(keyString: string): Promise<CryptoKey> {
  const keyraw: JsonWebKey = JSON.parse(keyString);
  const key: CryptoKey = await window.crypto.subtle.importKey(KEY_FORMAT, keyraw, KEY_ALGORITHM, KEY_EXTRACTABLE, ['encrypt', 'decrypt']);
  return key;
}

// function decodeBufferToString(buffer: ArrayBuffer): string {
//   return Array.from(new Uint8Array(buffer))
//     .map((x) => x.toString(16).padStart(2, '0'))
//     .join('');
// }

// function encodeStringToBuffer(str: string): ArrayBuffer {
//   return new TextEncoder().encode(str);
// }

function ab2str(buf: ArrayBuffer): string {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function str2ab(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length * 2);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export { geneKeyString, encrypt, decrypt };
