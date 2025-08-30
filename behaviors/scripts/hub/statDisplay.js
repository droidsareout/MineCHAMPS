import { system, world } from "@minecraft/server";

//Stat bar
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const gold = world.scoreboard.getObjective("gold")

        if (player.hasTag("inGame")) return;

        if (player.hasTag("optedIn")) player.onScreenDisplay.setActionBar(`§aOpted-in §7| §eGold§7: §c${gold.getScore(player)}`);
            else player.onScreenDisplay.setActionBar(`§cOpted-out §7| §gGOLD§7: §c${gold.getScore(player)}`);
    };
});