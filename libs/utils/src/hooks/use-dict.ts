import { ref, toRefs, ToRefs } from 'vue';
import { isNonEmptyString } from '../validate';

type DictItem = { value: string; label: string; type: string };
type DictInfo = { status: DictInfoStatus; list: Dict; time: number };
type DictInfoStatus = 'PENDING' | 'SUCCESS';
type Api = (type: string) => Promise<DictItem[]>;

const DICT_SESSION_STORAGE_KEY_PREFIX = '__dict__session__storage__';

// 字典缓存的过期时间 -1代表永不过期
const EXPIRE_TIME = -1;

class DictMap {
  private static instance: DictMap;
  private map: Map<string, DictInfo> = new Map();
  private api: Api;

  constructor(api: Api) {
    this.map = new Map();
    this.api = api;
    try {
      Object.keys(window.sessionStorage).forEach((key) => {
        if (key.startsWith(DICT_SESSION_STORAGE_KEY_PREFIX)) {
          const str = window.sessionStorage.getItem(key);
          if (str !== null) {
            const type = key.substring(26);
            const cache = JSON.parse(str);
            const dict = new Dict(cache.list, cache.time);
            this.map.set(type, { status: 'SUCCESS', list: dict, time: dict.getTime() });
          }
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  // 获取实例
  public static getInstance(api: Api): DictMap {
    if (DictMap.instance === undefined) {
      DictMap.instance = new DictMap(api);
    }
    return DictMap.instance;
  }

  // 重置 清空缓存
  public reset(): void {
    this.map.clear();
    Object.keys(window.sessionStorage).forEach((key) => {
      if (key.startsWith(DICT_SESSION_STORAGE_KEY_PREFIX)) {
        window.sessionStorage.removeItem(key);
      }
    });
  }

  // 查询字典数据
  public async listDict(type: string): Promise<Dict> {
    // 类型为空则直接返回空
    if (!isNonEmptyString(type)) {
      return Promise.resolve(new Dict());
    }
    const info = this.map.get(type);
    // 当前字典不存在 发起请求
    if (info === undefined) {
      // 请求之前设置请求为pending状态
      this.map.set(type, { status: 'PENDING', list: new Dict(), time: new Date().getTime() });
      // 发起请求
      return this.loadDictFromApi(type)
        .then((dict) => {
          this.setDictToMap(type, dict);
          return this.loadDictFromMap(type);
        })
        .catch(() => {
          this.map.delete(type);
          return Promise.reject();
        });
    }

    // 当前字典远程请求正在处理中 则等待1秒后再次尝试
    if (info.status === 'PENDING') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.listDict(type));
        }, 1000);
      });
    }

    // 当前字典是否过期
    if (EXPIRE_TIME > -1 && new Date().getTime() > info.time + EXPIRE_TIME) {
      this.map.delete(type);
      window.sessionStorage.removeItem(DICT_SESSION_STORAGE_KEY_PREFIX + type);
      return this.listDict(type);
    }

    // 当前字典已经请求完成 直接返回
    return Promise.resolve(this.loadDictFromMap(type));
  }

  // 从远程接口拿取数据
  private loadDictFromApi(type: string): Promise<Dict> {
    return this.api(type).then((response) => new Dict(response));
  }

  // 从Map中拿取数据
  private loadDictFromMap(type: string): Dict {
    return this.map.get(type)?.list as Dict;
  }

  // 向Map中设置数据
  private setDictToMap(type: string, dict: Dict) {
    this.setDictToSessionStorage(type, dict);
    this.map.set(type, { status: 'SUCCESS', list: dict, time: dict.getTime() });
  }

  // 向session storage中保存数据
  private setDictToSessionStorage(type: string, dict: Dict) {
    window.sessionStorage.setItem(DICT_SESSION_STORAGE_KEY_PREFIX + type, dict.toString());
  }
}

class Dict {
  private list: DictItem[] = [];
  private time: number;

  constructor(list?: DictItem[], time?: number) {
    this.list = list || [];
    this.time = time || new Date().getTime();
  }

  [Symbol.iterator]() {
    let count = 0;
    const limit = this.list.length;
    const dicts = this.list;
    return {
      next() {
        if (count <= limit) {
          count = count + 1;
          return { done: false, value: dicts[count - 1] };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  }

  toString(): string {
    return JSON.stringify(this);
  }

  toLabel(value: unknown): string {
    if (typeof value !== 'string') {
      return '';
    }
    return this.list.find((x) => x.value === value)?.label || value;
  }

  toValue(label: unknown): string {
    if (typeof label !== 'string') {
      return '';
    }
    return this.list.find((x) => x.label === label)?.value || label;
  }

  toList(): DictItem[] {
    return this.list;
  }

  getTime(): number {
    return this.time;
  }
}

const hook = (api: Api, ...args: string[]): ToRefs<Record<string, Dict>> => {
  const map = DictMap.getInstance(api);
  const result = ref<Record<string, Dict>>({});
  return (() => {
    args.forEach((d: string) => {
      result.value[d] = new Dict();
      map.listDict(d).then((list) => (result.value[d] = list));
    });
    return toRefs(result.value);
  })();
};

export default hook;
export type { DictItem };
