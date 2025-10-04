import { world, system, StructureAnimationMode } from "@minecraft/server";
import { gameInPlay, games, maps } from "../status";

export function gameEnd() {
  const gameStats = world.scoreboard.getObjective("gameStats");

  world.getPlayers().forEach((player) => {
    gameStats.setScore("active", 0);
    gameStats.setScore("min", 0);
    gameStats.setScore("sec", 0);
    gameStats.setScore("finished", 0);
    gameStats.setScore("placement", 0);
    gameStats.setScore("interval", 0);

    if (player.hasTag("inGame") || player.hasTag("spectatingGame")) {
      player.playSound("mob.enderdragon.hit", { volume: 0.25 });
      player.onScreenDisplay.setTitle("§vGAME OVER", {
        stayDuration: 120,
        fadeInDuration: 3,
        fadeOutDuration: 20,
      });
    }

    world.sendMessage("§vGAME OVER");

    system.runTimeout(() => {
      if (player.hasTag("inGame") || player.hasTag("spectatingGame")) {
        player.camera.fade({
          fadeTime: {
            fadeInTime: 1.5,
            holdTime: 3,
            fadeOutTime: 1.5,
          },
          fadeColor: {
            red: 0,
            green: 0,
            blue: 0,
          },
        });
      }

      system.runTimeout(() => {
        if (player.hasTag("inGame") || player.hasTag("spectatingGame")) {
          player.removeTag("inGame");
          player.removeTag("spectatingGame");
          player.setGameMode("Adventure");
          player.teleport(
            { x: 0.5, y: -59, z: 0.5 },
            { facingLocation: { x: 0.5, y: -59, z: 1.5 } },
          );
        }

        world.structureManager.place(
          "arenaDefault",
          world.getDimension("overworld"),
          { x: -31, y: -64, z: 39 },
          {
            animationMode: StructureAnimationMode.Blocks,
            animationSeconds: 15,
          },
        );
        system.runTimeout(() => {
          world.structureManager.place(
            "arenaDefault",
            world.getDimension("overworld"),
            { x: -31, y: -64, z: 39 },
            {
              animationMode: StructureAnimationMode.Blocks,
              animationSeconds: 10,
            },
          );

          switch (gameInPlay()) {
            case "§6Dash§r":
              world.sendMessage("§uDASH PLACEMENTS");
              for (const player of world.getAllPlayers()) {
                if (
                  world.scoreboard
                    .getObjective("gamePlacement")
                    .getScore(player) === 1
                ) {
                  world.sendMessage(`§p1st §7${player.name}`);
                  player.playSound("random.levelup");
                } else if (
                  world.scoreboard
                    .getObjective("gamePlacement")
                    .getScore(player) === 2
                ) {
                  world.sendMessage(`§i2nd §7${player.name}`);
                  player.playSound("random.levelup");
                } else if (
                  world.scoreboard
                    .getObjective("gamePlacement")
                    .getScore(player) === 3
                ) {
                  world.sendMessage(`§n3rd §7${player.name}`);
                  player.playSound("random.levelup");
                } else {
                  world.sendMessage("`§vNo one finished.");
                  player.playSound("random.break");
                }
              }
              break;
          }
          for (let i = 0; i < games.length; i++) {
            if (
              world.scoreboard.getObjective("gameInPlay").getScore(games[i]) ===
              1
            ) {
              world.scoreboard.getObjective("gameInPlay").setScore(games[i], 0);
            }
          }
          for (let i = 0; i < maps.length; i++) {
            if (
              world.scoreboard.getObjective("mapInPlay").getScore(maps[i]) === 1
            ) {
              world.scoreboard.getObjective("mapInPlay").setScore(maps[i], 0);
            }
          }
          world
            .getDimension("overworld")
            .runCommand("scoreboard players reset * gamePlacement");
        }, 150);
      }, 60);
    }, 100);
  });
}
