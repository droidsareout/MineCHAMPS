import { system, world } from '@minecraft/server';

system.runInterval(() => {
    world.getPlayers().forEach((player) => {
        const loc = player.location;

        if (
            Math.floor(loc.x) === 42 &&
            Math.floor(loc.y) === -59 &&
            Math.floor(loc.z) === 71
        ) {
            player.teleport(
                { x: 0.5, y: -52, z: -19.5 },
                { facingLocation: { x: 0.5, y: -52, z: -21.5 } },
            );
            player.sendMessage("§gTeleported to §uALfred's shOP§g.");
            system.runTimeout(() => player.playSound('mob.endermen.portal'), 1);
        }

        //Get out of ALfred's shOP
        if (
            Math.floor(loc.x) === 1 &&
            Math.floor(loc.y) === -61 &&
            Math.floor(loc.z) === -18
        ) {
            player.teleport(
                { x: 43.5, y: -62, z: -8.5 },
                { facingLocation: { x: 43.5, y: -62, z: -7.5 } },
            );
            player.sendMessage("§gExited §uALfred's shOP§g.");
            system.runTimeout(() => player.playSound('mob.endermen.portal'), 1);
        }
    });
});
