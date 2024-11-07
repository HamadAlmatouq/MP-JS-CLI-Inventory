import inquirer from "inquirer";

import {
  addGame,
  deleteGame,
  updateGame,
  viewGames,
  filterGames,
} from "./controllers.js";

function showMenu() {
  console.log("\n");
  const choices = [
    { name: "Add a Game", value: "add" },
    { name: "Update a Game", value: "update" },
    { name: "Delete a Game", value: "delete" },
    { name: "View all Games", value: "list" },
    { name: "Filter Games", value: "filter" },
    { name: "Exit", value: "exit" },
  ];
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action:",
        choices,
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "add":
          addGame();
          break;
        case "update":
          updateGame();
          break;
        case "delete":
          deleteGame();
          break;
        case "list":
          viewGames();
          break;
        case "filter":
          filterGames();
        case "exit":
          console.log("Exiting the program.");
          break;
      }
    });
}

export default showMenu;
