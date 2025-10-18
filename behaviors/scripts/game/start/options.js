import { world, system } from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';

import { gameOptions } from '../options';
import { gameBoot } from './boot';

import { games, dashMaps, gameInPlay, mapInPlay } from '../status';

export function gameStartOptions(player) {
    const form = new ActionFormData()
        .title('§qStart Options')
        .body(
            '§7Pick how you want to start the game. Clicking an option will begin the process of starting right after.',
        )
        .button('§uPick Random Game', 'textures/ui/random_dice')
        .button('RETURN', 'textures/ui/arrow_left');
    form.show(player).then((r) => {
        switch (r.selection) {
            case 0:
                gameSelect(player);
                break;
            case 1:
                gameOptions(player);
                break;
        }
    });
}

function gameSelect() {
    const gameInPlayObj = world.scoreboard.getObjective('gameInPlay');
    const mapInPlayObj = world.scoreboard.getObjective('mapInPlay');

    function getRandomString(stringArray) {
        const randomIndex = Math.floor(Math.random() * stringArray.length);
        return stringArray[randomIndex];
    }

    world.sendMessage('§uSelecting a random game and map to play.');
    world.getPlayers().forEach((players) => players.playSound('note.chime'));
    gameInPlayObj.setScore(getRandomString(games), 1);

    switch (gameInPlay()) {
        case '§6Dash§r':
            mapInPlayObj.setScore(getRandomString(dashMaps), 1);
            break;
    }

    system.runTimeout(() => {
        world.sendMessage('§uGame and map chosen. The selected game is...');
        world
            .getPlayers()
            .forEach((players) => players.playSound('note.flute'));

        system.runTimeout(() => {
            world.getPlayers().forEach((players) => {
                players.onScreenDisplay.setTitle(gameInPlay(), {
                    stayDuration: 120,
                    fadeInDuration: 3,
                    fadeOutDuration: 20,
                });
                players.playSound('mob.enderdragon.flap');
            });
            world.sendMessage(gameInPlay());
            system.runTimeout(() => {
                world
                    .getPlayers()
                    .forEach((players) => players.playSound('note.flute'));
                world.sendMessage('§uWith the map...');

                system.runTimeout(() => {
                    world.getPlayers().forEach((players) => {
                        players.onScreenDisplay.updateSubtitle(mapInPlay());
                        players.playSound('mob.enderdragon.flap');
                    });
                    world.sendMessage(mapInPlay());
                }, 40);
            }, 40);
        }, 60);
    }, 60);

    system.runTimeout(() => {
        gameBoot();
    }, 280);
}
