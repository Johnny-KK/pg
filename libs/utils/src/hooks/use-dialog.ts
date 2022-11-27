import { computed, ref } from 'vue';

// 表单窗口状态
type Status = '新增' | '查看' | '编辑';

// 表单窗口默认状态
const DEFAULT_DIALOG_STATUS: Status = '新增';

const hook = <T>(name: string) => {
  // 表单窗口状态
  const status = ref<Status>(DEFAULT_DIALOG_STATUS);
  // 表单窗口标题
  const title = computed<string>(() => `${status.value}${name}`);
  // 表单窗口是否可见
  const visible = ref<boolean>(false);
  // 表单实体
  const model = ref<T | undefined>();

  // 隐藏窗口
  function hide() {
    visible.value = false;
  }

  // 新增表单
  function add(t?: T) {
    status.value = '新增';
    model.value = t;
    visible.value = true;
  }

  // 编辑表单
  function edit(t: T) {
    status.value = '编辑';
    model.value = t;
    visible.value = true;
  }

  // 查看表单
  function view(t: T) {
    status.value = '查看';
    model.value = t;
    visible.value = true;
  }

  return { status, title, visible, model, hide, add, edit, view };
};

export default hook;
