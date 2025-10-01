import { world, InputPermissionCategory, GameMode } from "@minecraft/server";

world.afterEvents.playerSpawn.subscribe((data) => {
  const { initialSpawn, player } = data;

  if (initialSpawn) {
    if (player.hasTag("member")) {
      //player has joined before
      player.removeTag("inGame");
      player.inputPermissions.setPermissionCategory(
        InputPermissionCategory.Movement,
        true,
      );
      player.setGameMode(GameMode.Adventure);
      player.teleport(
        { x: 0.5, y: -59, z: 0.5 },
        { facingLocation: { x: 0.5, y: -59, z: 1.5 } },
      );
      player.sendMessage("§7Welcome back to §aMine§gCHAMPS§7!");
    } else {
      //player has never joined before
      player.sendMessage("§7Welcome to §aMine§gCHAMPS§7!");
      player.addTag("member");
      world.scoreboard.getObjective("worldStats").addScore("uniqueJoins", 1);
    }
  }
});
