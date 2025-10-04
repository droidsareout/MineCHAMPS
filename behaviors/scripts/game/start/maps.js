import {
  system,
  world,
  StructureAnimationMode,
  InputPermissionCategory,
} from "@minecraft/server";

export function dashBiomeMania() {
  world.structureManager.place(
    "Dash_BiomeMania",
    world.getDimension("overworld"),
    { x: -31, y: -64, z: 39 },
    {
      animationMode: StructureAnimationMode.Blocks,
      animationSeconds: 15,
    },
  );

  system.runTimeout(() => {
    world.getPlayers().forEach((player) => {
      if (
        player.hasTag("optedIn") === false ||
        player.hasTag("inGame") === false
      )
        return;

      world.structureManager.place(
        "Dash_BiomeMania",
        world.getDimension("overworld"),
        { x: -31, y: -64, z: 39 },
        {
          animationMode: StructureAnimationMode.Blocks,
          animationSeconds: 10,
        },
      );

      player.inputPermissions.setPermissionCategory(
        InputPermissionCategory.Movement,
        false,
      );
      player.teleport(
        { x: 0.5, y: -60, z: 44.5 },
        { facingLocation: { x: -1, y: -60, z: 47 } },
      );

      system.runTimeout(() => {
        player.sendMessage(
          "§n>> §6DASH INFORMATION\n§cMap: §7BiomeMania\n§gTime: §74m 0s\n§sHow to Play: §7Parkour to the end of the course in a select amount of time. There can only be three winners.",
        );
        player.playSound("random.pop");

        system.runTimeout(() => {
          player.onScreenDisplay.setTitle("§7Starting game in", {
            stayDuration: 160,
            fadeInDuration: 10,
            fadeOutDuration: 10,
          });

          let countdown = 6;
          const interval = system.runInterval(() => {
            countdown -= 1;
            player.onScreenDisplay.updateSubtitle(`§g${countdown}`);
            player.playSound("random.click");
            if (countdown < 1) {
              player.onScreenDisplay.updateSubtitle("");
              player.onScreenDisplay.setTitle("");
              player.playSound("mob.enderdragon.growl", { volume: 0.15 });
              player.inputPermissions.setPermissionCategory(
                InputPermissionCategory.Movement,
                true,
              );
              world.scoreboard.getObjective("gameStats").setScore("min", 4);
              world.scoreboard.getObjective("gameStats").setScore("sec", 0);
              system.clearRun(interval);
            }
          }, 20);
        }, 100);
      }, 140);
    });
  }, 140);
}
