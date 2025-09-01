import { 
    BlockComponentRandomTickEvent,
    BlockVolume, 
    CommandPermissionLevel, 
    CustomCommandParamType, 
    CustomCommandStatus, 
    EntityComponentTypes, 
    EquipmentSlot, 
    GameMode, 
    ScriptEventSource, 
    system, 
    world
} from "@minecraft/server";

import { ActionFormData, ModalFormData, uiManager } from "@minecraft/server-ui";

system.beforeEvents.startup.subscribe(event => {
    event.customCommandRegistry.registerCommand(
        {
            name: "minechamps:spawn",
            description: "Return to spawn",
            permissionLevel: CommandPermissionLevel.Any,
        },
        (origin) => {
            if (origin.sourceEntity.hasTag("inGame")) {
                system.run(() => origin.sourceEntity.playSound("random.break"));
                origin.sourceEntity.sendMessage("§vYou cannot return to spawn while in game!");
            
                return { status: CustomCommandStatus.Success };
            } else if (origin.sourceEntity.hasTag("spectatingGame")) {
                system.run(() => {
                    origin.sourceEntity.removeTag("spectatingGame")
                    origin.sourceEntity.setGameMode(GameMode.Adventure);
                    origin.sourceEntity.teleport({ x: 0.50, y: -59, z: 0.50 }, { facingLocation: { x: 0.50, y: -59, z: 1.50} })
                });
                system.runTimeout(() => origin.sourceEntity.playSound("mob.endermen.portal"), 1);
                origin.sourceEntity.sendMessage("§gExcited spectator.");

                return { status: CustomCommandStatus.Success };
            } else {
                system.run(() => origin.sourceEntity.teleport({ x: 0.50, y: -59, z: 0.50 }, { facingLocation: { x: 0.50, y: -59, z: 1.50} }));
                system.runTimeout(() => origin.sourceEntity.playSound("mob.endermen.portal"), 1);
                origin.sourceEntity.sendMessage("§gTeleported to §3Spawn§g.");

                return { status: CustomCommandStatus.Success };
            }
        }
    );

    event.customCommandRegistry.registerCommand(
        {
            name: "minechamps:discord",
            description: "Get the link to the discord server",
            permissionLevel: CommandPermissionLevel.Any,
        },
        (origin) => {
            system.run(() => origin.sourceEntity.sendMessage("§gDiscord server code: §UyJtnkyUfE"));

            return { status: CustomCommandStatus.Success };
        }
    );

    event.customCommandRegistry.registerCommand(
        {
            name: "minechamps:statview",
            description: "View yours or other people's stats",
            permissionLevel: CommandPermissionLevel.Any
        },
        (origin) => {
            system.run(() => {
                statViewOptions(origin.sourceEntity)
                origin.sourceEntity.playSound("random.pop");
            });
        }
    );

    event.customCommandRegistry.registerCommand(
        {
            name: "minechamps:clearchat",
            description: "Fill chat with blank spaces to clear it.",
            permissionLevel: CommandPermissionLevel.GameDirectors
        },
        (origin) => {
            system.run(() => {
                for (let i = 0; i < 100; i++) world.sendMessage(" ");
                world.sendMessage(`§uChat cleared by ${origin.sourceEntity.name}.`);
                world.getPlayers().forEach((players) => players.playSound("random.pop"));
            });
        }
    );

    event.customCommandRegistry.registerCommand(
        {
            name: "minechamps:maps",
            description: "Teleport to the maps",
            permissionLevel: CommandPermissionLevel.GameDirectors
        },
        (origin) => {
            system.run(() => {
                origin.sourceEntity.teleport({ x: 0.50, y: -60, z: -249.50 }, { facingLocation: { x: 0.50, y: -60, z: -250.50 }});
                system.runTimeout(() => origin.sourceEntity.playSound("mob.endermen.portal"), 1);
                origin.sourceEntity.sendMessage("§gTeleported to §nMaps§g.");
            });
        }
    );
});

function getScore(id, target) {
    return world.scoreboard.getObjective(id).getScore(target)
};

function statViewOptions(player) {
    const form = new ActionFormData()
        .title("§5Stat View")
        .body("§7Who would you like to view the stats of?")
        .button("§dYourself", "textures/ui/icon_alex")
        .button("§uOthers", "textures/ui/icon_multiplayer")
        .button("EXIT", "textures/ui/x_default")
    form.show(player).then(r => {
        switch (r.selection) {
            case 0:
                yourStats(player);
                break;
            case 1:
                othersStats(player);
                break;
            case 2:
                uiManager.closeAllForms(player);
                break;
        };
    });
};
//Your stats
function yourStats(player) {
    const form = new ActionFormData()
        .title(`§8Your §5Stats`)
        .body(`§g§lGENERAL§r\n§h> §bPlaytime§7: §c${getScore("ptDay", player)}§7d, §c${getScore("ptHour", player)}§7h, §c${getScore("ptMin", player)}§7m, §c${getScore("ptSec", player)}§7s\n§h> §dWins§7: §c${getScore("wins", player)}\n§h> §gGold§7: §c${getScore("gold", player)}\n§h> §cKills§7: §c${getScore("kills", player)}\n§h> §4Deaths§7: §c${getScore("deaths", player)}`)
        .button("RETURN", "textures/ui/arrow_left")
    form.show(player).then(r => {
        if (r.selection == 0) statViewOptions(player);
    });
};
//Others stats
function othersStats(player) {
    const players = world.getPlayers({ excludeNames: [player.name] });
    const form = new ModalFormData();
        form.title("§5Stat View");
        form.dropdown("Select a Player", players.map(player => player.name));
    form.show(player).then((r) => { 
        if (r.canceled) {
        } else {
            const target = players[r.formValues[0]];
            const form = new ActionFormData()
                .title(`§8${target.name}'s §5Stats`)
                .body(`§g§lGENERAL§r\n§h> §bPlaytime§7: §c${getScore("ptDay", target)}§7d, §c${getScore("ptHour", target)}§7h, §c${getScore("ptMin", target)}§7m, §c${getScore("ptSec", target)}§7s\n§h> §dWins§7: §c${getScore("wins", target)}\n§h> §gGold§7: §c${getScore("gold", target)}\n§h> §cKills§7: §c${getScore("kills", target)}\n§h> §4Deaths§7: §c${getScore("deaths", target)}`)
                .button("RETURN", "textures/ui/arrow_left")
            form.show(player).then(r => {
                if (r.selection == 0) statViewOptions(player);
            });
        };
    });
};