import { world, system } from "@minecraft/server";
import { gameInPlay, mapInPlay, games, maps } from "../status";
import { gameEnd } from "./ending";

system.runInterval(() => {
  world.getPlayers().forEach((player) => {
    const inGame = world.scoreboard.getObjective("worldStats").getScore("inGame");
    const gameMin = world.scoreboard.getObjective("gameStats").getScore("min");
    const gameSec = world.scoreboard.getObjective("gameStats").getScore("sec");
    const gameActive = world.scoreboard.getObjective("gameStats").getScore("active");
    const gameInterval = world.scoreboard.getObjective("gameStats").getScore("interval");

    if (gameMin === 1 && gameSec === 0 && gameInterval === 0) {
      world.sendMessage("§v1 minute remains!")
      player.playSound("random.break");
      world.scoreboard.getObjective("gameStats").addScore("interval", 1);
    } else if (gameMin === 0 && gameSec === 5 && gameInterval === 1) {
      player.playSound("random.break");
      world.scoreboard.getObjective("gameStats").addScore("interval", 1);
    } else if (gameMin === 0 && gameSec === 4 && gameInterval === 2) {
      player.playSound("random.break");
      world.scoreboard.getObjective("gameStats").addScore("interval", 1);
    } else if (gameMin === 0 && gameSec === 3 && gameInterval === 3) {
      player.playSound("random.break");
      world.scoreboard.getObjective("gameStats").addScore("interval", 1);
    } else if (gameMin === 0 && gameSec === 2 && gameInterval === 4) {
      player.playSound("random.break");
      world.scoreboard.getObjective("gameStats").addScore("interval", 1);
    } else if (gameMin === 0 && gameSec === 1 && gameInterval === 5) {
      player.playSound("random.break");
      world.scoreboard.getObjective("gameStats").addScore("interval", 1);
    };

    switch (gameInPlay()) {
      case "§6Dash§r":
        if (gameMin === 0 && gameSec === 0 && gameActive === 1) {
          gameEnd();

        };
        break;
    };
  });
});