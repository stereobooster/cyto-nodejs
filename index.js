import { spawn } from "node:child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const executablePath = `${__dirname}/bin/cyto-nodejs.js`;

export const cytoSnap = (src, dst) => {
  return new Promise((resolve, reject) => {
    const srcStdin = typeof src !== "string";
    const args = [];
    let res = "";
    if (!srcStdin) args.push("-s", src);
    if (dst) args.push("-d", dst);

    const bin = spawn(executablePath, args, {
      windowsHide: true,
    });

    bin.stdout.on("data", (data) => (res = data));
    bin.stderr.on("data", (data) => reject(`stderr: ${data}`));
    bin.on("close", (code) => {
      if (code === 0) {
        resolve(res);
      } else {
        reject(`child process exited with code ${code}`);
      }
    });
    if (srcStdin) {
      bin.stdin.write(JSON.stringify(src));
      bin.stdin.end();
    }
  });
};
