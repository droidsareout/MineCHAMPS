import { world, system } from "@minecraft/server";
import { ActionFormData, uiManager } from "@minecraft/server-ui";

function getScore(id, target) {
  return world.scoreboard.getObjective(id).getScore(target);
}

world.beforeEvents.playerInteractWithEntity.subscribe((event) => {
  const { player, target, itemStack } = event;

  if (
    player.hasTag("inGame") ||
    target.typeId !== "minecraft:player" ||
    itemStack
  )
    return;

  system.run(() => statView(player));

  function statView(player) {
    const form = new ActionFormData()
      .title(`§6${target.name}'s §5Stats`)
      .body(
        `§g§lGENERAL§r\n§h> §bPlaytime§7: §c${getScore("ptDay", target)}§7d, §c${getScore("ptHour", target)}§7h, §c${getScore("ptMin", target)}§7m, §c${getScore("ptSec", target)}§7s\n§h> §dWins§7: §c${getScore("wins", target)}\n§h> §gGold§7: §c${getScore("gold", target)}\n§h> §cKills§7: §c${getScore("kills", target)}\n§h> §4Deaths§7: §c${getScore("deaths", target)}`,
      )
      .button("EXIT", "textures/ui/x_default");
    form.show(player).then((r) => {
      if (r.selection === 0) uiManager.closeAllForms(player);
    });
  }
});
