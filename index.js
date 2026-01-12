import fs from "node:fs";
import { Command } from "commander";
import { saveJsonFile, outputFilePath } from "./utils/handle_output.js";
import {
  addItem,
  deleteItem,
  listAllTasks,
  updateItem,
} from "./utils/handle_task.js";
import { Tasks } from "./lib/tasks.js";
import { error } from "node:console";
import { describe } from "node:test";

// const test_data = [{ test: "data", type: "jsonstringify", id: "number" }];

// const jsonData = JSON.stringify(test_data, null, 4);

const program = new Command();

const checkInt = (value) => {
  const parsed = parseInt(value);
  if (isNaN(parsed)) {
    throw new Error("ID must be a valid number");
  }
  return parsed;
};
program
  .name("Task Tracker")
  .description("CLI to mange tasks and tod lists")
  .version("1.0.0");

program
  .command("add <task>")
  .description("Adds task to the list")
  .action((task) => {
    const taskObject = addItem(task);
    if (taskObject instanceof Tasks) {
      console.log(`Task added successfully (ID: ${taskObject.id})`);
    }
  });

program
  .command("list")
  .description("gives a list of the tasks and ID")
  .action(() => {
    listAllTasks();
  });

program
  .command("delete")
  .argument("<ID>", "ID of the target task", checkInt)
  .description("deletes targeted task from list using ID")
  .action((identifier) => {
    deleteItem(identifier);
  });

program
  .command("update")
  .argument("<ID>", "ID of the targeted task", checkInt)
  .argument("<description>", "updated description for the identified task")
  .description("update targeted task from list using ID")
  .action((ID, description) => {
    // console.log(`handle update  ID: ${ID}, Description: "${description}"`);
    updateItem(ID, description);
  });

program.command("mark-in-progress");

program.command("mark-done");

// createJsonFile();
// console.log(outputFilePath);

program.parse();
