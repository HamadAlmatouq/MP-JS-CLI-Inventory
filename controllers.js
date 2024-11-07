import inquirer from "inquirer";

import Game from "./game.js";
import showMenu from "./menu.js";

export function addGame() {
  inquirer
    .prompt([
      { name: "name", message: "Enter game name:" },
      { name: "publisher", message: "Enter the publisher name:" },
      { name: "genre", message: "Enter the genre:" },
      {
        name: "published",
        type: "input",
        message: "Enter the publishing year:",
        validate: (year) => {
          const yearNum = parseInt(year, 10);
          if (isNaN(yearNum)) {
            return "Please enter a valid number for the publishing year.";
          }
          return (
            yearNum <= new Date().getFullYear() ||
            "This game was published in the future??"
          );
        },
      },
    ])
    .then((game) => {
      Game.create(game);
      console.log(`Added ${game.title} by ${game.author}.`);
      showMenu();
    });
}

export function updateGame() {
  const games = Game.find();
  if (games.length === 0) {
    console.log("No games available to update.");
    return showMenu();
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "gameId",
        message: "Choose a game to update:",
        choices: games.map((game) => ({ name: game.name, value: game.id })),
      },
    ])
    .then(({ gameId }) => {
      const game = Game.findById(gameId);
      inquirer
        .prompt([
          {
            name: "name",
            message: "Enter new game name (leave blank to keep current):",
          },
          {
            name: "publisher",
            message: "Enter new publisher (leave blank to keep current):",
          },
          {
            name: "genre",
            message: "Enter new genre (leave blank to keep current):",
          },
          {
            name: "published",
            type: "input",
            message: "Enter new published year (leave blank to keep current):",
            validate: (year) => {
              const yearNum = parseInt(year, 10);
              if (isNaN(yearNum)) {
                return "Please enter a valid number for the publishing year.";
              }
              return (
                yearNum <= new Date().getFullYear() ||
                "This game was published in the future??"
              );
            },
          },
        ])
        .then((updates) => {
          const { name, publisher, genre, published } = updates;
          if (name) game.name = name;
          if (publisher) game.publisher = publisher;
          if (genre) game.genre = genre;
          if (published) game.published = parseInt(published);
          console.log(`Updated ${game.name}.`);
          showMenu();
        });
    });
}

export function deleteGame() {
  const games = Game.find();
  if (games === 0) {
    console.log("No games available to delete.");
    return showMenu();
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "gameId",
        message: "Choose a game to delete:",
        choices: games.map((game) => ({ name: game.name, value: game.id })),
      },
    ])
    .then(({ gameId }) => {
      Game.delete(gameId);
      console.log(`Deleted a game: "${gameId}".`);
      showMenu();
    });
}

export function viewGames() {
  const games = Game.find();
  console.log("\nCurrent Game Catalgoue:");
  if (games.length === 0) {
    console.log("No Games in the catalgoue.");
  } else {
    console.table(games, ["name", "publisher", "genre", "published"]);
  }
  showMenu();
}

//Added filter by
export function filterGames() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "criterion",
        message: "Filter by:",
        choices: [
          { name: "Name", value: "name" },
          { name: "Publisher", value: "publisher" },
          { name: "Genre", value: "genre" },
          { name: "Published Year", value: "published" },
        ],
      },
    ])
    .then(({ criterion }) => {
      inquirer

        .prompt([
          {
            name: "value",
            message: `Enter the ${criterion} to filter by:`,
          },
        ])
        .then(({ value }) => {
          const games = Game.find();
          let filteredGames;

          if (criterion === "published") {
            const year = parseInt(value, 10);
            if (isNaN(year)) {
              console.log("Please enter a valid year.");
              return showMenu();
            }
            filteredGames = games.filter((game) => game.published === year);
          } else {
            filteredGames = games.filter((game) =>
              game[criterion].toLowerCase().includes(value.toLowerCase())
            );
          }

          if (filteredGames.length === 0) {
            console.log("No games found with that filter.");
          } else {
            console.table(filteredGames, [
              "name",
              "publisher",
              "genre",
              "published",
            ]);
          }
          showMenu();
        });
    });
}
