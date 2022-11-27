import { series, parallel } from "gulp";
import { run } from "../utils";
import { resolve } from "path";

const path = resolve(__dirname, "../../");

export default series(
  async () => remove(),
  parallel(async () => build())
);

function remove() {
  return run("rm -rf dist", path);
}

function build() {
  return run("pnpm vite build", path);
}
