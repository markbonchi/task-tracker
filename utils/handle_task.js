import { Tasks } from "../lib/tasks.js";
import { loadJsonFile, saveJsonFile } from "./handle_output.js";

const createTask = (description, taskInstances) => {
  // declaring new task instance
  const newTask = new Tasks(description);
  if (taskInstances.length !== 0) {
    const availableID = taskInstances.map((item) => item.id);
    // console.log(availableID.sort((a, b) => a - b));

    // If length of list is less than the last ID value indicating a missing number in the middle
    if (taskInstances.length < availableID[taskInstances.length - 1]) {
      // finding missing index to replace with new task
      for (let i = 1; i < availableID[taskInstances.length - 1]; i++) {
        if (availableID.includes(i)) {
          // If current value of i is in the list of indexes move on to the next
          // console.log(`in: ${i}`);
          continue;
        } else {
          // else set as unique ID of the new task instance and break the loop
          // console.log(i);
          newTask.setId(i);
          break;
        }
      }
    }
  }
  return newTask;
};

// Tried to handle repititions (didn't work out) but primary features work fine
// const validatingTask = (description, jsonObject) => {
//   for (let item in jsonObject) {
//     if (description === item.description) return true;
//   }
//   return false;
// };

const addItem = (description) => {
  let fileData = loadJsonFile();

  // recreate lists of instances for better navigation and data manipulation
  const taskInstances = fileData.map((item) => {
    if (!item.description || !item.id || !item.status) return item;
    return Tasks.fromJson(item);
  });
  // console.log(taskInstances);

  // adding new task
  let newTask = createTask(description, taskInstances);
  taskInstances.push(newTask);
  console.log(taskInstances);
  saveJsonFile(taskInstances);
  return newTask;
};

// display all avaliable tasks on the list including their unique identifiers
const listAllTasks = () => {
  const fileData = loadJsonFile();

  if (fileData.length === 0) return console.log("Nothing to do yet");
  // console.log(fileData);
  for (let i = 0; i < fileData.length; i++) {
    console.log(`${fileData[i].description} (ID: ${fileData[i].id})`);
  }
};

// delete item from task using the unique Identifier
const deleteItem = (identifier) => {
  const buffer = [];
  const fileData = loadJsonFile();

  const availableID = fileData.map((item) => item.id); // create list of available indexes in fileData
  // console.log(availableID);

  if (!availableID.includes(identifier)) return console.log("No such task"); // if identifier is not in the available index list

  for (let i = 0; i < fileData.length; i++) {
    if (identifier === fileData[i].id) continue; // skip index so it is not in the new buffer list
    buffer.push(fileData[i]);
  }
  saveJsonFile(buffer);
};

// updating item description in tasks using unique identifier
const updateItem = (identifier, newDescription) => {
  const fileData = loadJsonFile();

  const availableID = fileData.map((item) => item.id); // create list of available indexes in fileData
  if (!availableID.includes(identifier))
    // chacking if unique identifier exists
    return console.log("No such task exists");

  // recreate lists of instances for better navigation and data manipulation
  const taskInstances = fileData.map((item) => {
    if (!item.description || !item.id || !item.status) return item;
    return Tasks.fromJson(item);
  });

  // iterating through list of task instances in search of the unique identifier
  for (let i = 0; i < taskInstances.length; i++) {
    if (identifier !== taskInstances[i].id) continue; // if i is not equal to identifier skip

    // if description is the same and theres no need to update
    if (newDescription === taskInstances[i].description)
      return console.log("Looks the same to me");

    // make the necessary updates
    taskInstances[i].setDescription(newDescription);
    taskInstances[i].setUpdatedAt(new Date().toISOString);
    // console.log(taskInstances[i]);
    break;
  }
  // console.log(taskInstances);
  // console.log(fileData);
  saveJsonFile(taskInstances);
};

export { createTask, addItem, listAllTasks, deleteItem, updateItem };
