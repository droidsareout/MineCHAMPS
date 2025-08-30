import { world, system } from "@minecraft/server";

world.beforeEvents.chatSend.subscribe((event) => {
    let player = event.sender;
    let message = event.message;
    let tags = player.getTags();

    if (message.startsWith("!")) return;

    event.cancel = true;
    let chatName = player.name;

    let rank = tags.filter((tag) => tag.startsWith("rank:")).map(tag => tag.replace("rank:", ""));
    
    if (tags.find((tag) => tag.includes("rank:"))) {
        world.sendMessage("§r" + rank + " §7" + chatName + "§r: " + message);
        return;
    } else {
        world.sendMessage("§7" + chatName + "§r: " + message);
    };
});

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        let tags = player.getTags();
        let rank = tags.filter((tag) => tag.startsWith("rank:")).map(tag => tag.replace("rank:", ""));

        if (tags.find((tag) => tag.includes("rank:"))) {
            player.nameTag = `${rank} §7${player.name}§r`
        } else {
            player.nameTag = `§7${player.name}§r`
        };
    };
});