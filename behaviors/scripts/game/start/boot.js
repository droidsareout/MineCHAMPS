import { world, system } from '@minecraft/server';

import { dashBiomeMania } from '../maps/dash.js';
import { spleefOctogono } from '../maps/spleef.js'
import { gameInPlay, mapInPlay } from '../status';

export function gameBoot() {
    const gameStats = world.scoreboard.getObjective('gameStats');
	gameStats.setScore('active', 1);

    world.sendMessage('§uBooting up game.');
    world.getPlayers().forEach((players) => players.playSound('note.chime'));

    system.runTimeout(() => {
        gameBootPlayers();

        switch (gameInPlay()) {
            case '§6Dash§r':
                switch (mapInPlay()) {
                    case '§qBiome§nMania§r':
                        dashBiomeMania();
                        break;
                }
                break;

            case '§bSpleef§r':
                switch (mapInPlay()) {
                    case 'Octogono':
						spleefOctogono();
                        break;
                }
        }
    }, 20);
}

function gameBootPlayers() {
    world.getPlayers().forEach((players) => {
        if (players.hasTag('optedIn')) {
            players.addTag('inGame');
            players.camera.fade({
                fadeTime: {
                    fadeInTime: 5,
                    holdTime: 5,
                    fadeOutTime: 5,
                },
                fadeColor: {
                    red: 0,
                    green: 0,
                    blue: 0,
                },
            });
        }
    });
}
