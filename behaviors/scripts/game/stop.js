import {
  world,
  system,
  StructureAnimationMode,
  InputPermissionCategory,
} from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

import { gameOptions } from "./options";
import { games, maps } from "./status";

export function gameStopOptions(player) {
  const form = new ActionFormData()
    .title("§4Stop Options")
    .body(`§7Are you sure you want to end the game? If so, select "§4End§7".`)
    .button("§4End", "textures/ui/red_dot")
    .button("RETURN", "textures/ui/arrow_left");
  form.show(player).then((r) => {
    switch (r.selection) {
      case 0:
        gameStopConfirm(player);
        break;

      case 1:
        gameOptions(player);
        break;
    }
  });
}

function gameStopConfirm(player) {
  const gameStats = world.scoreboard.getObjective("gameStats");
  const active = gameStats.getScore("active");

  world.getPlayers().forEach((players) => {
    if (player.hasTag("inGame")) {
      gameStats.setScore("active", 0);
      gameStats.setScore("interval", 0);
      players.removeTag("inGame");
      players.teleport(
        { x: 0.5, y: -59, z: 0.5 },
        { facingLocation: { x: 0.5, y: -59, z: 1.5 } },
      );
      players.inputPermissions.setPermissionCategory(
        InputPermissionCategory.Movement,
        true,
      );
    }

    system.runTimeout(() => players.playSound("random.anvil_land"), 1);
  });

  world.sendMessage(`§uThe game was stopped by §s${player.name}§u.`);

  gameStats.setScore("active", 0);
  gameStats.setScore("min", 0);
  gameStats.setScore("sec", 0);

  for (let i = 0; i < games.length; i++) {
    if (world.scoreboard.getObjective("gameInPlay").getScore(games[i]) === 1) {
      world.scoreboard.getObjective("gameInPlay").setScore(games[i], 0);
    }
  }
  for (let i = 0; i < maps.length; i++) {
    if (world.scoreboard.getObjective("mapInPlay").getScore(maps[i]) === 1) {
      world.scoreboard.getObjective("mapInPlay").setScore(maps[i], 0);
    }
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
  }, 150);
}
