import fs from "node:fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

//Define file output directory
const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, "output", "data");
const outputFilePath = join(outputDir, "tasks.json");

//ensures directory exists (optional but recommended)
fs.mkdirSync(outputDir, { recursive: true });

const saveJsonFile = (json = []) => {
  let jsonData = JSON.stringify(json, null, 4);
  fs.writeFileSync(outputFilePath, jsonData);
  // console.log("Saved");
};

const validatefile = (path) => {
  if (!fs.existsSync(path)) return false;
  return true;
};

const loadJsonFile = () => {
  if (!validatefile(outputFilePath)) saveJsonFile();
  const data = fs.readFileSync(outputFilePath, "utf-8");
  return JSON.parse(data);
};

export { outputFilePath, saveJsonFile, loadJsonFile };
