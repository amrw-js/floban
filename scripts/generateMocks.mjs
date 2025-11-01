import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const columns = ["backlog", "todo", "in-progress", "review", "done"];

function generateTask(id) {
  return {
    id,
    title: faker.hacker.phrase(),
    description: faker.lorem.sentence(),
    column: faker.helpers.arrayElement(columns),
  };
}

const count = process.argv[2] || 20;
const tasks = Array.from({ length: count }, (_, i) => generateTask(i + 1));

// Create mocks directory if it doesn't exist
const mocksDir = path.join(__dirname, "..", "mocks");
if (!fs.existsSync(mocksDir)) {
  fs.mkdirSync(mocksDir, { recursive: true });
  console.log("📁 Created mocks directory");
}

const dbPath = path.join(mocksDir, "db.json");
fs.writeFileSync(dbPath, JSON.stringify({ tasks }, null, 2));

console.log(`✅ Generated ${count} tasks in mocks/db.json!`);
