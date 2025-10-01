import { world, system } from "@minecraft/server";

system.runInterval(() => {
  const gameStats = world.scoreboard.getObjective("gameStats");
  const active = gameStats.getScore("active");
  const sec = gameStats.getScore("sec");
  const min = gameStats.getScore("min");

  if (active === 1 && min >= 0) {
    gameStats.addScore("sec", -1);
  }
}, 20);

system.runInterval(() => {
  const gameStats = world.scoreboard.getObjective("gameStats");
  const active = gameStats.getScore("active");
  const sec = gameStats.getScore("sec");
  const min = gameStats.getScore("min");

  if (sec < 0) {
    gameStats.setScore("sec", 59);
    gameStats.addScore("min", -1);
  }

  world.getPlayers().forEach((player) => {
    if (active === 0) return;

    if (sec === -1) player.onScreenDisplay.setActionBar(``);
    else if (sec >= 0 && sec <= 9)
      player.onScreenDisplay.setActionBar(`§g${min}§7:§g0${sec}`);
    else if (min < 0) player.onScreenDisplay.setActionBar(``);
    else player.onScreenDisplay.setActionBar(`§g${min}§7:§g${sec}`);
  });
});
