import { App } from 'vue';
import HForm from './components/form';
import HTable from './components/table';
import HDescription from './components/description';
import HIcon from './components/icon';
import { GlobalConfig } from './types';

export { HForm, HTable, HDescription, HIcon };

const defaultConfig: GlobalConfig = { dictApi: () => Promise.resolve([]) };

export default {
  install: (app: App, config?: GlobalConfig) => {
    app.component('HForm', HForm);
    app.component('HTable', HTable);
    app.component('HDescription', HDescription);
    app.component('HIcon', HIcon);
    app.provide('globalConfig', config ?? defaultConfig);
  },
};

// export types
export type { GlobalConfig };

import type { FormConfig } from './components/form/utils/types';
export type { FormConfig };

import type { TableConfig } from './components/table/utils/types';
export type { TableConfig };

import { DescriptionConfig } from './components/description/utils/types';
export type { DescriptionConfig };
