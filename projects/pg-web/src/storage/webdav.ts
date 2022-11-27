import { decode, encode } from 'base-64';
import { fetch, ResponseType, getClient, Body } from '@tauri-apps/api/http';
import { byteLength } from 'byte-length';

const BASE_PATH = 'http://tiankk.iask.in:5005/home/pg';
const USERNAME = 'johnny';
const PASSWORD = 'a19930427a';

class Client {
  private authHeader: string;

  constructor() {
    this.authHeader = generateBasicAuthHeader(USERNAME, PASSWORD);
  }

  public async exists(path: string): Promise<boolean> {
    const { status } = await fetch(`${BASE_PATH}${encodePath(path)}`, {
      method: 'PROPFIND',
      headers: {
        Accept: 'text/plain,application/xml',
        Depth: '0',
        Authorization: this.authHeader,
      },
      responseType: ResponseType.Text,
    });
    if (status === 404) {
      return false;
    }
    return true;
  }

  public createDirectory(path: string): Promise<unknown> {
    return fetch(`${BASE_PATH}${ensureCollectionPath(encodePath(path))}`, {
      method: 'MKCOL',
      headers: {
        Authorization: this.authHeader,
      },
    });
  }

  public async getFileContents(filepath: string): Promise<unknown> {
    const { status, data } = await fetch(`${BASE_PATH}${encodePath(filepath)}`, {
      headers: {
        Authorization: this.authHeader,
      },
      method: 'GET',
      responseType: ResponseType.Text,
    });
    if (status === 404) {
      return undefined;
    }
    return data;
  }

  public async putFileContents(filepath: string, content: string): Promise<unknown> {
    const client = await getClient();

    return client.put(`${BASE_PATH}${encodePath(filepath)}`, Body.text(content), {
      headers: {
        Authorization: this.authHeader,
        'Content-Length': `${calculateDataLength(content)}`,
      },
    });

    // return fetch(`${BASE_PATH}${encodePath(filepath)}`, {
    //   method: 'PUT',
    //   headers: {
    //     Authorization: this.authHeader,
    //     'Content-Length': `${calculateDataLength(content)}`,
    //   },
    // });
  }
}

function createClient(): Client {
  return new Client();
}

function toBase64(text: string): string {
  return encode(text);
}

function fromBase64(text: string): string {
  return decode(text);
}

function ensureCollectionPath(path: string): string {
  if (!path.endsWith('/')) {
    return path + '/';
  }
  return path;
}

const SEP_PATH_POSIX = '__PATH_SEPARATOR_POSIX__';
const SEP_PATH_WINDOWS = '__PATH_SEPARATOR_WINDOWS__';
function encodePath(path) {
  const replaced = path.replace(/\//g, SEP_PATH_POSIX).replace(/\\\\/g, SEP_PATH_WINDOWS);
  const formatted = encodeURIComponent(replaced);
  return formatted.split(SEP_PATH_WINDOWS).join('\\\\').split(SEP_PATH_POSIX).join('/');
}

function generateBasicAuthHeader(username: string, password: string): string {
  const encoded = toBase64(`${username}:${password}`);
  return `Basic ${encoded}`;
}

type BufferLike = Buffer | ArrayBuffer;
const hasArrayBuffer = typeof ArrayBuffer === 'function';
const { toString: objToString } = Object.prototype;
function isArrayBuffer(value: any): boolean {
  return hasArrayBuffer && (value instanceof ArrayBuffer || objToString.call(value) === '[object ArrayBuffer]');
}
function isBuffer(value: any): boolean {
  return value != null && value.constructor != null && typeof value.constructor.isBuffer === 'function' && value.constructor.isBuffer(value);
}

function calculateDataLength(data: string | BufferLike): number {
  if (isArrayBuffer(data)) {
    return (<ArrayBuffer>data).byteLength;
  } else if (isBuffer(data)) {
    return (<Buffer>data).length;
  } else if (typeof data === 'string') {
    return byteLength(<string>data);
  }
  throw new Error('Cannot calculate data length: Invalid type');
}

export { createClient };
