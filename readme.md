# Task Tracker

**Task-cli:** A minimalist high-performance task manager  
for power users who live in the terminal  
[**roadmap.sh**](https://roadmap.sh/projects/task-tracker)

---

**Prerequisites**

- Node.js (v18.0 or higher)

**Installation**

```
npm install @markbonchi/task-cli
```

| **command**        | **usage**                        | **description**                                 |
| :----------------- | :------------------------------- | :---------------------------------------------- |
| `add`              | `task-cli add <task>`            | Adds new task to `todo` status                  |
| `list`             | `task-cli list [status]`         | Gives a list of the tasks and `ID`              |
| `delete`           | `task-cli delete <ID>`           | Deletes targeted task from list using `ID`      |
| `update`           | `task-cli update <ID> <update>`  | Update targeted task from list using ID         |
| `mark-in-progress` | `task-cli mark-in-progress <ID>` | Update status of targeted task to `in-progress` |
| `mark-done`        | `task-cli mark-done <ID>`        | Update status of targeted task to `done`        |
| `help`             | `task-cli help [command]`        | Display help for command                        |
