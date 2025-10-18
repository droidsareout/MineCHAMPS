import { world } from '@minecraft/server';

export const maps = ['§qBiome§nMania§r','§gOctogono§r'];

export const dashMaps = ['§qBiome§nMania§r'];
export const spleefMaps = ['§gOctogono§r']

export const games = ['§6Dash§r', '§3Spleef§r'];

export function mapInPlay() {
    const participants = world.scoreboard
        .getObjective('mapInPlay')
        .getParticipants();
    let participantNames = participants.map(
        (participant) => participant.displayName,
    );

    for (const name of participantNames) {
        let playing = world.scoreboard.getObjective('mapInPlay').getScore(name);

        if (playing === 1) return name;
    }
}
export function gameInPlay() {
    const participants = world.scoreboard
        .getObjective('gameInPlay')
        .getParticipants();
    let participantNames = participants.map(
        (participant) => participant.displayName,
    );

    for (const name of participantNames) {
        let playing = world.scoreboard
            .getObjective('gameInPlay')
            .getScore(name);

        if (playing === 1) return name;
    }
}

export function active() {
    if (world.scoreboard.getObjective('gameStats').getScore('active')) {
        return '§7true';
    } else {
        return '§7false';
    }
}
