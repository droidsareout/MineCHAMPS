import { world, system } from "@minecraft/server";

import { dashBiomeMania } from "./maps";
import { gameInPlay, mapInPlay } from "../status";

export function gameBoot() {
    const gameStats = world.scoreboard.getObjective("gameStats")

    world.sendMessage("§uBooting up game...")
    gameStats.setScore("active", 1)
    world.getPlayers().forEach((players) => players.playSound("note.chime"));

    system.runTimeout(() => {
        gameBootPlayers()

        switch (gameInPlay()) {
            case "§6Dash§r":
                switch (mapInPlay()) {
                    case "§qBiome§nMania§r":
                        dashBiomeMania();
                        break;
                }
                break;
                
            case "§bSpleef§r":
                switch (maps) {

                }
        };
    }, 20);
};

function gameBootPlayers() {
    world.getPlayers().forEach((players) => {
        if (players.hasTag("optedIn")) {
            players.addTag("inGame");
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
        };
    });
};