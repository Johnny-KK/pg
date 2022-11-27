import form from './index.vue';
import { withInstall } from '@hb/utils';
import type { FormConfig, FormConfigHandled } from './utils/types';

export default withInstall(form, 'h-form');

export type { FormConfig, FormConfigHandled as IFormConfigHandled };
