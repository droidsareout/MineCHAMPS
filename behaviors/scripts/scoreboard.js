import { world, system } from '@minecraft/server';

//Default Values
world.afterEvents.playerJoin.subscribe((event) => {
    const player = world.getEntity(event.playerId);
    const scoreboard = world.scoreboard;
    const objectiveIds = [
        'kills',
        'deaths',
        'wins',
        'gold',
        'lifetimeGold',

        'ptSec',
        'ptMin',
        'ptHour',
        'ptDay',
    ];

    for (const id of objectiveIds) {
        const objective = scoreboard.getObjective(id);
        if (objective === undefined) continue;
        objective.addScore(player, 0);
    }
});

//Play Time
system.runInterval(() => {
    const ptSec =  world.scoreboard.getObjective('ptSec');
    const ptMin =  world.scoreboard.getObjective('ptMin');
    const ptHour = world.scoreboard.getObjective('ptHour');
    const ptDay =  world.scoreboard.getObjective('ptDay');

    for (const player of world.getAllPlayers()) {
        ptSec.addScore(player, 1);
        if (ptSec.getScore(player) >= 60) {
            ptSec.setScore(player, 0);
            ptMin.addScore(player, 1);
            if (ptMin.getScore(player) >= 60) {
                ptMin.setScore(player, 0);
                ptHour.addScore(player, 1);
                if (ptHour.getScore(player) >= 24) {
                    ptHour.setScore(player, 0);
                    ptDay.addScore(player, 1);
                }
            }
        }
    }
}, 20);

//Player counts
system.runInterval(() => {
    const overworld = world.getDimension('overworld');
    const worldStats = world.scoreboard.getObjective('worldStats');
    const onlineCount = world.getAllPlayers().length;
    const inGameCount = overworld.getPlayers({ tags: ['inGame'] }).length;
    const spectatingGameCount = overworld.getPlayers({ tags: ['spectatingGame'] }).length;
    const optedInCount = overworld.getPlayers({ tags: ['optedIn'] }).length;
    const optedOutCount = onlineCount - optedInCount;

    worldStats.setScore('online', onlineCount);
    worldStats.setScore('inGame', inGameCount);
    worldStats.setScore('spectatingGame', spectatingGameCount);
    worldStats.setScore('optedIn', optedInCount);
    worldStats.setScore('optedOut', optedOutCount);
});
