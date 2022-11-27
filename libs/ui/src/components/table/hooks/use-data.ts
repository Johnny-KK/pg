import { computed, ref, Ref, watch } from 'vue';
import { ApiFunction, ApiPage } from '../utils/types';

type DataHook<T> = { page: boolean; pageSize: number; pageHideWhenOne: boolean; data: T[]; api: ApiFunction<T> | null };

const hook = <T>(dh: Ref<DataHook<T>>) => {
  // 是否分页
  const page = computed<boolean>(() => dh.value.page);
  // 是否本地数据 优先级判定 当source为函数时优先从source加载数据
  const isLocal = computed<boolean>(() => !(typeof dh.value.api === 'function'));
  // 数据总量
  const total = ref<number>(0);
  // 当前页码数
  const current = ref<number>(1);
  // 每页数量
  const size = computed<number>(() => dh.value.pageSize);
  // 是否隐藏分页
  const hidePage = computed<boolean>(() => page.value === false || (Math.ceil(total.value / size.value) < 2 && dh.value.pageHideWhenOne === true));
  // 数据
  const list = ref<T[]>([]) as Ref<T[]>;

  load();
  watch(() => dh.value.data, load);

  // 加载数据
  function load(): void {
    // 本地非分页
    if (isLocal.value === true && page.value === false) {
      list.value = dh.value.data;
      return;
    }
    // 本地分页
    if (isLocal.value == true && page.value === false) {
      total.value = dh.value.data.length;
      list.value = dh.value.data.slice((current.value - 1) * size.value, current.value * size.value);
      return;
    }
    // 远程非分页
    if (isLocal.value === false && page.value === false) {
      dh.value.api().then((response: T[]) => {
        list.value = response;
      });
      return;
    }
    // 远程分页
    if (isLocal.value == false && page.value === true) {
      dh.value.api().then((response: ApiPage<T>) => {
        total.value = response.total;
        list.value = response.list;
      });
      return;
    }
  }

  // 跳转到指定页面
  function handleCurrentChange(page: number) {
    current.value = page;
    load();
  }

  // 上一页
  function preview() {
    current.value += 1;
    load();
  }

  // 下一页
  function next() {
    current.value -= 1;
    load();
  }

  return { list, page, hidePage, size, total, load, handleCurrentChange, preview, next };
};

export default hook;
export type { DataHook };
