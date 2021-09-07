import { readFile } from "fs/promises";

async function importJSON(path) {
  const file = await readFile(path);
  return JSON.parse(file);
}

export default importJSON;
