import { world, system } from "@minecraft/server";

//Default Values
system.runInterval(() => {
  world.getPlayers().forEach((player) => {
    const scoreboard = world.scoreboard;
    const scoreboards = [
      "kills",
      "deaths",
      "wins",
      "gold",
      "lifetimeGold",

      "ptSec",
      "ptMin",
      "ptHour",
      "ptDay",
    ];

    for (let i = 0; i < scoreboards.length; i++) {
      if (
        scoreboard.getObjective(scoreboards[i]).getScore(player) === undefined
      ) {
        scoreboard.getObjective(scoreboards[i]).addScore(player, 0);
      }
    }
  });
});

//Play Time
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    world.scoreboard.getObjective("ptSec").addScore(player, 1);
  }
}, 20);
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const ptSec = world.scoreboard.getObjective("ptSec");
    const ptMin = world.scoreboard.getObjective("ptMin");
    const ptHour = world.scoreboard.getObjective("ptHour");
    const ptDay = world.scoreboard.getObjective("ptDay");

    if (ptSec.getScore(player) >= 60) {
      ptSec.setScore(player, 0);
      ptMin.addScore(player, 1);
    } else if (ptMin.getScore(player) >= 60) {
      ptMin.setScore(player, 0);
      ptHour.addScore(player, 1);
    } else if (ptHour.getScore(player) >= 24) {
      ptHour.setScore(player, 0);
      ptDay.addScore(player, 1);
    }
  }
});

//Player counts
system.runInterval(() => {
  world.getPlayers().forEach((player) => {
    const worldStats = world.scoreboard.getObjective("worldStats");
    let onlineCount = Number(JSON.stringify(world.getAllPlayers().length));
    let inGameCount = Number(
      JSON.stringify(player.dimension.getPlayers({ tags: ["inGame"] }).length),
    );
    let spectatingGameCount = Number(
      JSON.stringify(
        player.dimension.getPlayers({ tags: ["spectatingGame"] }).length,
      ),
    );
    let optedInCount = Number(
      JSON.stringify(player.dimension.getPlayers({ tags: ["optedIn"] }).length),
    );
    let optedOutCount = onlineCount - optedInCount;

    worldStats.setScore("online", onlineCount);
    worldStats.setScore("inGame", inGameCount);
    worldStats.setScore("spectatingGame", spectatingGameCount);
    worldStats.setScore("optedIn", optedInCount);
    worldStats.setScore("optedOut", optedOutCount);
  });
});
