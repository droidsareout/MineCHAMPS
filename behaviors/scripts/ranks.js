import { world, system } from '@minecraft/server';

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        const rank = player.getTags()
            .find((tag) => tag.startsWith('rank:'))
            ?.replace('rank:', '');

        player.nameTag = rank
            ? `${rank} §7${player.name}§r`
            : `§7${player.name}§r`;
    }
}, 20);

world.beforeEvents.chatSend.subscribe((event) => {
    const { sender: player, message } = event;

    if (message.startsWith('!')) return;

    event.cancel = true;
    world.sendMessage(`${player.nameTag}: ${message}`);
});
