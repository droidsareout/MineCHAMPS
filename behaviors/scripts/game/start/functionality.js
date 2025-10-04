import { world, system } from "@minecraft/server";
import { gameInPlay, mapInPlay } from "../status";
import { gameEnd } from "./ending";

system.runInterval(() => {
  world.getPlayers().forEach((player) => {
    const loc = player.location;

    const gameMin = world.scoreboard.getObjective("gameStats").getScore("min");
    const gameSec = world.scoreboard.getObjective("gameStats").getScore("sec");
    const gamePlayers = world.scoreboard
      .getObjective("worldStats")
      .getScore("inGame");
    const gameActive = world.scoreboard
      .getObjective("gameStats")
      .getScore("active");
    const gameInterval = world.scoreboard
      .getObjective("gameStats")
      .getScore("interval");

    if (gameMin === 1 && gameSec === 0 && gameInterval === 0) {
      world.sendMessage("§v1 minute remains!");
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
    }

    switch (gameInPlay()) {
      case "§6Dash§r":
        switch (mapInPlay()) {
          case "§qBiome§nMania§r":
            if (
              Math.floor(loc.x) === 26 &&
              Math.floor(loc.y) === -59 &&
              Math.floor(loc.z) === 77 &&
              player.getGameMode() === "Adventure"
            ) {
              world.scoreboard
                .getObjective("gameStats")
                .addScore("finished", 1);
              switch (
                world.scoreboard.getObjective("gameStats").getScore("placement")
              ) {
                case 0:
                  world.scoreboard
                    .getObjective("gameStats")
                    .setScore("placement", 1);

                  player.sendMessage(
                    "§gYou finished in §p§l1st place§r§g!\n§g+10 Gold",
                  );
                  world.scoreboard.getObjective("gold").addScore(player, 10);
                  world.scoreboard.getObjective("wins").addScore(player, 1);
                  world.scoreboard
                    .getObjective("lifetimeGold")
                    .addScore(player, 10);
                  world.scoreboard
                    .getObjective("gamePlacement")
                    .setScore(player, 1);
                  player.playSound("random.levelup");
                  player.setGameMode("Spectator");
                  player.addTag("spectatingGame");
                  player.removeTag("inGame");
                  player.sendMessage(
                    "§gYou are now spectating the game. Type §a/spawn §gto leave.",
                  );
                  break;

                case 1:
                  world.scoreboard
                    .getObjective("gameStats")
                    .setScore("placement", 2);

                  player.sendMessage(
                    "§gYou finished in §i§l2nd place§r§g!\n§g+5 Gold",
                  );
                  world.scoreboard.getObjective("gold").addScore(player, 5);
                  world.scoreboard
                    .getObjective("lifetimeGold")
                    .addScore(player, 5);
                  world.scoreboard
                    .getObjective("gamePlacement")
                    .setScore(player, 2);
                  player.playSound("random.levelup");
                  player.setGameMode("Spectator");
                  player.addTag("spectatingGame");
                  player.removeTag("inGame");
                  player.sendMessage(
                    "§gYou are now spectating the game. Type §a/spawn §gto leave.",
                  );
                  break;

                case 2:
                  world.scoreboard
                    .getObjective("gameStats")
                    .setScore("placement", 1);

                  player.sendMessage(
                    "§gYou finished in §n§l3rd place§r§g!\n§g+3 Gold",
                  );
                  world.scoreboard.getObjective("gold").addScore(player, 3);
                  world.scoreboard
                    .getObjective("lifetimeGold")
                    .addScore(player, 3);
                  world.scoreboard
                    .getObjective("gamePlacement")
                    .setScore(player, 3);
                  player.playSound("random.levelup");
                  player.setGameMode("Spectator");
                  player.addTag("spectatingGame");
                  player.removeTag("inGame");
                  player.sendMessage(
                    "§gYou are now spectating the game. Type §a/spawn §gto leave.",
                  );
                  break;
              }
            }
            break;
        }

        if (gameMin === 0 && gameSec === 0 && gameActive === 1) {
          gameEnd();
        } else if (gamePlayers === 0 && gameActive === 1) {
          gameEnd();
        }
        break;
    }
  });
});
