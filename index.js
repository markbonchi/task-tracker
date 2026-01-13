#!/usr/bin/env node

import { Command } from "commander";
import {
  addItem,
  deleteItem,
  listAllTasks,
  updateItem,
  updateStatus,
} from "./utils/handle_task.js";
import { Tasks, status_list } from "./lib/tasks.js";

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
  .description("CLI task manager to manage tasks and todo lists")
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
  .argument(
    "[status]",
    "List tasks according to  their status; todo, in-progress, done"
  )
  .description("gives a list of the tasks and ID")
  .action((status) => {
    listAllTasks(status);
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
    updateItem(ID, description);
  });

program
  .command("mark-in-progress")
  .argument("<ID>", "ID of the target task", checkInt)
  .description("Update status  of targeted task to 'in-progress'")
  .action((identifier) => {
    updateStatus(identifier, status_list[1]);
  });

program
  .command("mark-done")
  .argument("<ID>", "ID of the target task", checkInt)
  .description("update status  of targeted task to 'done'")
  .action((identifier) => {
    updateStatus(identifier, status_list[2]);
  });

program.parse();
