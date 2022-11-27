import { dest, series, src } from "gulp";
import { run } from "../utils";
import { resolve } from "path";

const path = resolve(__dirname, "../../");

export default series(async () => publish());

async function publish() {
  await run("pnpm version patch", `${path}/production`);
  await src(`${path}/production/**`).pipe(dest(`${path}/dist/`));
  await run("npm publish", `${path}/dist`);
}
