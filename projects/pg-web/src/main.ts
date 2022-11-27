import { createApp } from 'vue';
import App from './app.vue';

// style
import 'normalize.css';
import './styles/index.less';

// router
import router from './router';

// file drop
import { drop } from './plugins/drop';
drop();

// markdown
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
VueMarkdownEditor.use(vuepressTheme, { Prism });

const app = createApp(App);
app.use(router);
app.use(VueMarkdownEditor);
app.mount('#app');

// sync
import { sync } from './storage';
sync();
