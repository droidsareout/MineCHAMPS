import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

import { gameStopOptions } from "./stop";
import { gameStartOptions } from "./start/options";
import { gameInPlay, mapInPlay, active } from "./status";

export function gameOptions(player) {
  const gameStats = world.scoreboard.getObjective("gameStats");
  const worldStats = world.scoreboard.getObjective("worldStats");

  const playersOnline = worldStats.getScore("online");
  const playersInGame = worldStats.getScore("inGame");
  const playersOptedIn = worldStats.getScore("optedIn");

  const gameActive = gameStats.getScore("active");
  const gtSec = gameStats.getScore("sec");
  const gtMin = gameStats.getScore("min");

  const form = new ActionFormData()
    .title("§nGame Options")
    .body(
      `§g§lPLAYERS§r\n§eOnline§7: ${playersOnline}\n§eOpted-in§7: ${playersOptedIn}\n§eIn Game§7: ${playersInGame}\n\n§g§lGAME§r\n§eIn Play§7: ${active()}\n§eGame§7: ${gameInPlay()}\n§eMap§7: ${mapInPlay()}\n§eTime Left: §7${gtMin}:${gtSec}`,
    )
    .button("§qStart Game", "textures/ui/green")
    .button("§4End Game", "textures/ui/red_dot");
  form.show(player).then((r) => {
    if (r.cancelationReason === "UserBusy") {
      return system.runTimeout(() => {
        gameOptions(player);
      }, 1);
    }

    switch (r.selection) {
      case 0:
        if (gameActive === 1) {
          player.sendMessage("§vA game is already in play.");
          player.playSound("random.break");
        }
        // else if (playersOptedIn < 2) {
        //     player.sendMessage(`§s${playersOptedIn} §vplayers opted-in is not enough to start a game.`);
        //     player.playSound("random.break");
        // }
        else {
          gameStartOptions(player);
        }
        break;

      case 1:
        if (gameActive === 0) {
          player.sendMessage("§vNo game is in play to stop.");
          player.playSound("random.break");
        } else {
          gameStopOptions(player);
        }
        break;
    }
  });
}
