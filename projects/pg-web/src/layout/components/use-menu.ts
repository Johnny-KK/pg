import { ref } from 'vue';
import { menu } from '../../router';

const hook = () => {
  const isExpend = ref<boolean>(false);

  function expend() {
    isExpend.value = true;
  }

  function collapse() {
    isExpend.value = false;
  }

  return { isExpend, menuList: menu, expend, collapse };
};

export default hook;
