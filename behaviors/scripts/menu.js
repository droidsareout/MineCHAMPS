import { world, system, ItemStack } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";

/* FUNCTIONALITY */
//Creation
function mainForm(player) {
    const form = new ActionFormData()
        .title("§u§lMENU")
        .body("")
        .button("§sSpawn\n§8Teleport to spawn", "textures/ui/worldsIcon")
        .button("§vSpectate\n§8Spectate the game", "textures/ui/camera-yo")
        .button("§9Opting\n§8Join the next game", "textures/ui/color_plus")
        .button("§5Stat View\n§8View player stats", "textures/ui/icon_steve")
    form.show(player).then(r => {
        switch (r.selection) {
            case 0:
                spawn(player);
                break;
            case 1:
                spectate(player);
                break;
            case 2:
                optOptions(player);
                break;
            case 3:
                statViewOptions(player);
                break;
        };
    });
};
function mainFormInGame(player) {
    const form = new ActionFormData()
        .title(`§u§lMENU`)
        .body(``)
        .button("§5Stat View\n§8View player stats", "textures/ui/icon_steve")
    form.show(player).then(r => {
        if (r.selection === 0) statViewOptions(player);
    });
};

//Give item
system.runInterval(() => {
    world.getPlayers().forEach((player) => {
        const menu = new ItemStack("minecraft:lodestone_compass", 1);
        const inventory = player.getComponent("minecraft:inventory");
        menu.nameTag = "§r§u§lMENU §r§7[USE]";
        menu.lockMode = "slot";

        inventory.container.setItem(8, menu);
    });
});

//Open menu
world.afterEvents.itemUse.subscribe((event) => {
    const itemStack = event.itemStack;
    const player = event.source;

    const menu = new ItemStack("minecraft:lodestone_compass", 1);
    menu.nameTag = "§r§u§lMENU §r§7[USE]";
    menu.lockMode = "inventory";

    if (
        itemStack.typeId !== "minecraft:lodestone_compass" && 
        itemStack.nameTag !== "§r§u§lMENU §r§7[USE]"
    ) return;

    if (player.hasTag("inGame")) mainFormInGame(player)
        else mainForm(player)
});


/* OPTIONS */
//Opt
function optOptions(player) {
    const form = new ActionFormData()
        .title(`§9Opting`)
        .body(`§7Select whether or not you want to participate in the next game.`)
        .button("§aOpt-in", "textures/ui/realms_green_check")
        .button("§cOpt-out", "textures/ui/cancel")
        .button("RETURN", "textures/ui/arrow_left")
    form.show(player).then(r => {
        if (r.selection === 0) optIn(player);
        if (r.selection === 1) optOut(player);
        if (r.selection === 2) mainForm(player);
    });
};
function optIn(player) {
    if (player.hasTag("optedIn")) {
        player.sendMessage("§vYou're already §aopted-in§v for the next game.");
        player.playSound("random.break");
    } else {
        player.addTag("optedIn")
        player.playSound("random.orb");
        player.sendMessage("§gYou've §aopted-in §gfor the next game.");
    };
};
function optOut(player) {
    if (player.hasTag("optedIn")) {
        player.removeTag("optedIn")
        player.playSound("random.orb");
        player.sendMessage("§gYou've §copted-out §gfor the next game.");
    } else {
        player.sendMessage("§vYou're already §copted-out§v for the next game.");
        player.playSound("random.break");
    };
};

//Spawn
function spawn(player) {
    player.teleport({ x: 0.50, y: -59, z: 0.50 }, { facingLocation: { x: 0.50, y: -59, z: 1.50 } });
    player.sendMessage("§gTeleported to Spawn.");
    system.runTimeout(() => player.playSound("mob.endermen.portal"), 1)
};

//Spectate
function spectate(player) {
    const gameActive = world.scoreboard.getObjective("gameStats").getScore("active")
    
    if (gameActive === 0) {
        player.sendMessage("§vNo game is in play to spectate.");
        player.playSound("random.break");
    } else {
        player.setGameMode("spectator");
        player.addTag("spectatingGame")
        player.teleport({ x: 0.50, y: -40, z: 70.50 }, { facingLocation: { x: 0.50, y: -40, z: 69.50 } });
        player.sendMessage("§gYou are now spectating the game. Type §a/spawn §gto leave.");
        system.runTimeout(() => player.playSound("mob.endermen.portal"), 1);
    };
};

//Stat view
export function statViewOptions(player) {
    const form = new ActionFormData()
        .title("§5Stat View")
        .body("§7Who would you like to view the stats of?")
        .button("§dYourself", "textures/ui/icon_alex")
        .button("§uOthers", "textures/ui/icon_multiplayer")
        .button("RETURN", "textures/ui/arrow_left")
    form.show(player).then(r => {
        switch (r.selection) {
            case 0:
                yourStats(player);
                break;
            case 1:
                othersStats(player);
                break;
            case 2:
                (player.hasTag("inGame")) ? mainFormInGame(player) : mainForm(player);
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

function getScore(id, target) {
    return world.scoreboard.getObjective(id).getScore(target)
};
