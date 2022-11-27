<template>
  <div class="h-form" :class="cc">
    <template v-for="(item, index) in cellList" :key="index">
      <form-item
        :span="item.cell.span"
        :label="item.cell.label"
        :label-width="item.cell.labelWidth"
        :label-align="item.cell.labelAlign"
        @click.prevent="onItemClick(item)"
      >
        <component :is="item.cell.__component__" :field="item.config" :model="model" @update="updateModel"></component>
      </form-item>
    </template>
  </div>
</template>

<script lang="ts" setup name="h-form">
import './styles/index.less';
import { provide, toRefs } from 'vue';
import { ShimType } from '../common';
import { FormConfig } from './utils/types';
import FormItem from './components/form-item.vue';
import Schema, { Rules, ValidateError, Values } from 'async-validator';
import useForm from './hooks/use-form';

const props = withDefaults(defineProps<{ config: FormConfig<ShimType>; model: ShimType }>(), {
  config: () => ({ data: {}, fieldList: [] }),
  model: () => ({}),
});

const { config, model } = toRefs(props);

const { cellList, cc } = useForm(config, props.model);
// v-model
const emits = defineEmits<{ (e: 'update:model', form: ShimType): void }>();
provide<(value: unknown, prop: string) => void>('updateModel', updateModel);
function updateModel(value: unknown, prop: string) {
  emits('update:model', Object.assign({}, model.value, { [prop]: value }));
}

async function validate(): Promise<Values> {
  const a = generateDescriptor();
  const schema = new Schema(a);
  return new Promise((resolve, reject) => {
    schema
      .validate(model.value)
      .then(() => resolve([]))
      .catch(({ errors }: { errors: ValidateError[] }) => {
        if (Array.isArray(errors) && errors.length > 0) {
          errors.forEach((x) => {
            // setError(x.field);
          });
        }
        reject(errors);
      });
  });
}

function generateDescriptor(): Rules {
  const result: Rules = {};
  cellList.value.forEach((x) => {
    if (x.required) {
      result[x.prop as string] = {
        required: true,
      };
    }
  });
  return result;
}

function onItemClick(e: unknown) {
  console.warn(e);
}

defineExpose({ validate });
</script>
