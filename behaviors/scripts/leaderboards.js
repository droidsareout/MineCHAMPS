import { world, system } from "@minecraft/server";

world.afterEvents.worldLoad.subscribe(() => system.runInterval(() => {
    world.getDimension("overworld").getEntities({ type: "minechamps:floating_text" }).forEach((entity) => {
        const tags = entity.getTags();

        let scoreboard = tags.find(tag => tag.startsWith("scoreboard:"));
        if (!scoreboard) return;
        scoreboard = scoreboard.slice(11);

        scoreboard = world.scoreboard.getObjective(scoreboard);

        const ascending = entity.hasTag('ascending');
        const showOffline = entity.hasTag('showOffline');

        if (!scoreboard) return;

        let text = [];

        text.push(scoreboard.displayName);

        let participants = [];

        scoreboard.getScores().forEach(scoreInfo => {
            const name = scoreInfo.participant.getEntity().getTags().filter(tag => tag.startsWith("name:")).map(tag => tag.slice(5))[0] ?? scoreInfo.participant.displayName;
            const score = scoreInfo.score;

            if (!showOffline && name == 'commands.scoreboard.players.offlinePlayerName') return;

            participants.push({
                name: name,
                score: score,
            });
        });
        
        if (ascending) {
            participants.sort((a, b) => a.score - b.score);
        } else {
            participants.sort((a, b) => b.score - a.score);
        };

        // participants.forEach(participant => text.push(`§c${participant.score} §7${participant.name}`));

        for (let i = 1; i <= Math.min(10, participants.length); i++) {
            const participant = participants[i - 1];

            let number = `§7${i}`;
            if (i == 1) number = `§p${i}`;
            if (i == 2) number = `§i${i}`;
            if (i == 3) number = `§n${i}`;

            text.push(`§l${number}§r§8...§7${participant.name} §c${participant.score}`);
        };

        entity.nameTag = text.join('\n');
    });
}));