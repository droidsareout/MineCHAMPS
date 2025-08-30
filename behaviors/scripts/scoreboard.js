import { world, system } from "@minecraft/server";

//Default Values
system.runInterval(() => {
    world.getPlayers().forEach((player) => {
        const scoreboard = world.scoreboard
        const scoreboards = [
            "kills",
            "deaths",
            "wins",
            "gold",
            "lifetimeGold",
            
            "ptSec",
            "ptMin",
            "ptHour",
            "ptDay"
        ];

        for (let i = 0; i < scoreboards.length; i++) {
            if (scoreboard.getObjective(scoreboards[i]).getScore(player) === undefined) {
                scoreboard.getObjective(scoreboards[i]).addScore(player, 0);
            };
        };
    });
});