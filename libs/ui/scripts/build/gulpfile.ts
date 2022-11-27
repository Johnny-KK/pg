import { series, parallel, src, dest } from "gulp";
import { run } from "../utils";
import { resolve } from "path";
import less from "gulp-less";
import autoprefixer from "gulp-autoprefixer";

const path = resolve(__dirname, "../../");

export default series(
  async () => remove(),

  parallel(async () => {
    await buildComponent();
    await buildStyle();
  })
);

function remove() {
  return run("rm -rf dist", path);
}

async function buildComponent() {
  return await run("pnpm vite build", path);
}

//处理样式
async function buildStyle() {
  return await src(`${path}/src/**/styles/**.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(dest(`${path}/dist/lib`))
    .pipe(dest(`${path}/dist/es`));
}
