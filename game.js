import { v4 as uuid4 } from "uuid";

import videoGames from "./data/games.js";

const game = {};

game.create = function (gameData) {
  const newBook = { ...gameData, published: +gameData.published, id: uuid4() };
  videoGames.push(newBook);
  return newBook;
};

game.find = function (where) {
  return videoGames;
};

game.findById = function (gameId) {
  return videoGames.find((game) => game.id === gameId);
};

game.delete = function (gameId) {
  const deleteIndex = videoGames.findIndex((game) => game.id === gameId);
  if (deleteIndex !== -1) videoGames.splice(deleteIndex, 1);
};

export default game;
