import { dest, parallel, series, src } from 'gulp';
import { resolve, basename } from 'path';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import through2 from 'through2';
import { run } from '../utils';

const rootPath = resolve(__dirname, '../../');
const svgPath = `${rootPath}/src/svg`;
const componentPath = `${rootPath}/src/components`;

export default series(
  parallel(async () => {
    await remove();
    await generateVueFiles();
    await generateEntryFile();
  })
);

// genearte vue components files by svg files
async function generateVueFiles() {
  return await src(`${svgPath}/**.svg`).pipe(converSvgToVue()).pipe(rename(converVueFileName)).pipe(dest(componentPath));
}

// generate all components entry filr
async function generateEntryFile() {
  return await src(`${svgPath}/**.svg`).pipe(converFileNameToContent()).pipe(concat('index.ts')).pipe(dest(componentPath));
}

function converSvgToVue() {
  return through2.obj(function (chunk, encode, cb) {
    const { componentName } = generateNameByPath(chunk.path);
    const svg = chunk.contents.toString();
    const vue = generateVueFile(svg, componentName);
    chunk.contents = Buffer.from(vue);
    this.push(chunk);
    cb();
  });
}

function converVueFileName(path) {
  path.extname = '.vue';
}

function generateNameByPath(path: string): { filename: string; componentName: string } {
  const filename = basename(path).replace('.svg', '');
  const componentName = `h-${filename}`;
  return { filename, componentName };
}

function generateVueFile(svg: string, componentName: string): string {
  return `
<template>
  ${svg}
</template>
<script lang="ts">
import type { DefineComponent } from 'vue'
export default ({
  name: "${componentName}",
}) as DefineComponent
</script>
`;
}

// remove last time generate components files
async function remove(): Promise<unknown> {
  return run('rm -rf ./src/components', rootPath);
}

function converFileNameToContent() {
  return through2.obj(function (chunk, encode, cb) {
    const { filename } = generateNameByPath(chunk.path);
    const content = `export { default as ${camalize(filename)} } from './${filename}.vue'`;
    chunk.contents = Buffer.from(content);
    this.push(chunk);
    cb();
  });
}

function camalize(str: string): string {
  const name: string = str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  return name.replace(/^./, name[0].toUpperCase());
}
