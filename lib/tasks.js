import chalk from "chalk";

const status_list = ["todo", "in-progress", "done"];
const status_icon = {
  todo: chalk.greenBright("\u25CF"), // dot
  "in-progress": chalk.greenBright("\u25F7"), // circle 90 degree quadrant
  done: chalk.greenBright("\u2713"), // check mark
};

class Tasks {
  //initialise date instance and set date
  static date = new Date().toISOString();
  static instanceCounter = 1;

  constructor(description) {
    this.id = Tasks.instanceCounter++;
    this.description = description;
    this.status = status_list[0];
    this.createdAt = Tasks.date;
    this.updatedAt = this.createdAt;
  }

  setId(id) {
    this.id = id;
  }

  setUpdatedAt() {
    this.updatedAt = Tasks.date;
  }

  setDescription(description) {
    this.description = description;
    this.setUpdatedAt();
  }

  setStatus(status) {
    for (let item of status_list) {
      if (status === item) {
        this.status = status;
        this.setUpdatedAt();
      }
    }
  }

  #setCreatedAt(createdAt) {
    this.createdAt = createdAt;
  }
  #setUpdateddAt(updatedAt) {
    this.updatedAt = updatedAt;
  }

  // takes a parsed json object and converts to intance of the class
  static fromJson(json) {
    let temp = new Tasks(json.description);
    temp.setId(json.id);
    temp.setStatus(json.status);
    temp.#setCreatedAt(json.createdAt);
    temp.#setUpdateddAt(json.updatedAt);
    return temp;
  }
}

export { Tasks, status_list, status_icon };
