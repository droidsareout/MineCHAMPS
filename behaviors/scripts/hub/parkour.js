import { system, world } from "@minecraft/server";

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const loc = player.location;

        if ((Math.floor(loc.x)) <= -11 && ((Math.floor(loc.y)) <= -58 && (Math.floor(loc.z)) >= -25) && ((Math.floor(loc.x)) >= -28 && (Math.floor(loc.y)) >= -62 && (Math.floor(loc.z)) <= -11)) {
            player.teleport({ x: -19.50, y: -53, z: -11.50 }, { facingLocation: { x: -20, y: -53, z: -13 } });
            player.playSound("random.break", { volume: 0.5 })
        };
    };
});